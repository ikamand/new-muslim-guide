/**
 * @fugood/react-native-audio-pcm-stream ships no types. This is the slice of
 * its API `lib/recite-session.ts` uses — a thin event emitter over the native
 * mic, delivering base64 PCM chunks.
 */
declare module '@fugood/react-native-audio-pcm-stream' {
  export type PcmStreamOptions = {
    sampleRate: number;
    channels: number;
    bitsPerSample: number;
    /** Android AudioSource; 6 is VOICE_RECOGNITION. */
    audioSource: number;
    bufferSize: number;
    wavFile: string;
  };
  const LiveAudioStream: {
    /** Android returns a promise (its native init takes one); iOS is sync. */
    init(options: PcmStreamOptions): Promise<void> | void;
    start(): void;
    stop(): Promise<void> | void;
    on(event: 'data', callback: (base64Chunk: string) => void): void;
  };
  export default LiveAudioStream;
}
