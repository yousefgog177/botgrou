"use strict";

const util = require("util");
const ChildProcess = require("child_process");
const Dgram = require("dgram");
const Net = require("net");

const WebSocket = typeof window !== "undefined" ? require("../util/BrowserWebSocket") : require("ws");

let EventEmitter;
try {
    EventEmitter = require("eventemitter3");
} catch(err) {
    EventEmitter = require("events").EventEmitter;
}

let Sodium = null;
let NaCl = null;

const MAX_FRAME_SIZE = 1276 * 3;
const ENCRYPTION_MODE = "xsalsa20_poly1305";

const converterCommand = {
    cmd: null,
    libopus: false
};

converterCommand.pickCommand = function pickCommand() {
    let tenative;
    for(const command of ["./ffmpeg", "./avconv", "ffmpeg", "avconv"]) {
        const res = ChildProcess.spawnSync(command, ["-encoders"]);
        if(!res.error) {
            if(!res.stdout.toString().includes("libopus")) {
                tenative = command;
                continue;
            }
            converterCommand.cmd = command;
            converterCommand.libopus = true;
            return;
        }
    }
    if(tenative) {
        converterCommand.cmd = tenative;
        return;
    }
};

/**
* Represents a voice connection
* @extends EventEmitter
* @prop {String} channelID The ID of the voice connection's current channel
* @prop {Boolean} connecting Whether the voice connection is connecting
* @prop {Object?} current The state of the currently playing stream
* @prop {Object} current.options The custom options for the current stream
* @prop {Array<String>?} current.options.encoderArgs Additional encoder parameters to pass to ffmpeg/avconv (after -i)
* @prop {String?} current.options.format The format of the resource. If null, FFmpeg will attempt to guess and play the format. Available options: "dca", "ogg", "webm", "pcm", null
* @prop {Number?} current.options.frameDuration The resource opus frame duration (required for DCA/Ogg)
* @prop {Number?} current.options.frameSize The resource opus frame size
* @prop {Boolean?} current.options.inlineVolume Whether to enable on-the-fly volume changing. Note that enabling this leads to increased CPU usage
* @prop {Array<String>?} current.options.inputArgs Additional input parameters to pass to ffmpeg/avconv (before -i)
* @prop {Number?} current.options.sampleRate The resource audio sampling rate
* @prop {Number?} current.options.voiceDataTimeout Timeout when waiting for voice data (-1 for no timeout)
* @prop {Number} current.pausedTime How long the current stream has been paused for, in milliseconds
* @prop {Number} current.pausedTimestamp The timestamp of the most recent pause
* @prop {Number} current.playTime How long the current stream has been playing for, in milliseconds
* @prop {Number} current.startTime The timestamp of the start of the current stream
* @prop {String} id The ID of the voice connection (guild ID)
* @prop {Boolean} paused Whether the voice connection is paused
* @prop {Boolean} playing Whether the voice connection is playing something
* @prop {Boolean} ready Whether the voice connection is ready
* @prop {Number} volume The current volume level of the connection
*/
class VoiceConnection extends EventEmitter {
    constructor(id, options = {}) {
        super();

        if(typeof window !== "undefined") {
            throw new Error("Voice is not supported in browsers at this time");
        }

        if(!Sodium && !NaCl) {
            try {
                Sodium = require("sodium-native");
            } catch(err) {
                try {
                    NaCl = require("tweetnacl");
                } catch(err) { // eslint-disable no-empty
                    throw new Error("Error loading tweetnacl/libsodium, voice not available");
                }
            }
        }

        this.id = id;
        this.samplingRate = 48000;
        this.channels = 2;
        this.frameDuration = 20;
        this.frameSize = this.samplingRate * this.frameDuration / 1000;
        this.pcmSize = this.frameSize * this.channels * 2;
        this.bitrate = 64000;
        this.shared = !!options.shared;
        this.shard = options.shard || {};
        this.opusOnly = !!options.opusOnly;

        if(!this.opusOnly && !this.shared) {
            this.opus = {};
        }

        this.channelID = null;
        this.paused = true;
        this.speaking = false;
        this.sequence = 0;
        this.timestamp = 0;
        this.ssrcUserMap = {};
        this.connectionTimeout = null;
        this.connecting = false;
        this.reconnecting = false;
        this.ready = false;

        this.sendBuffer = Buffer.allocUnsafe(16 + 32 + MAX_FRAME_SIZE);
        this.sendNonce = Buffer.alloc(24);
        this.sendNonce[0] = 0x80;
        this.sendNonce[1] = 0x78;

    }


    play(source, options = {}) {
        if(this.shared) {
            throw new Error("Cannot play stream on shared voice connection");
        }
        if(!this.ready) {
            throw new Error("Not ready yet");
        }

        options.format = options.format || null;
        options.voiceDataTimeout = !isNaN(options.voiceDataTimeout) ? options.voiceDataTimeout : 2000;
        options.inlineVolume = !!options.inlineVolume;
        options.inputArgs = options.inputArgs || [];
        options.encoderArgs = options.encoderArgs || [];

        options.samplingRate = options.samplingRate || this.samplingRate;
        options.frameDuration = options.frameDuration || this.frameDuration;
        options.frameSize = options.frameSize || options.samplingRate * options.frameDuration / 1000;
        options.pcmSize = options.pcmSize || options.frameSize * 2 * this.channels;

        if(!this.piper.encode(source, options)) {
            this.emit("error", new Error("Unable to encode source"));
            return;
        }

        this.ended = false;
        this.current = {
            startTime: 0, // later
            playTime: 0,
            pausedTimestamp: 0,
            pausedTime: 0,
            bufferingTicks: 0,
            options: options,
            timeout: null,
            buffer: null
        };

        this.playing = true;

        /**
        * Fired when the voice connection starts playing a stream
        * @event VoiceConnection#start
        */
        this.emit("start");

        this._send();
    }

    /**
    * Generate a receive stream for the voice connection.
    * @arg {String} [type="pcm"] The desired voice data type, either "opus" or "pcm"
    * @returns {VoiceDataStream}
    */

}

VoiceConnection._converterCommand = converterCommand;

module.exports = VoiceConnection;