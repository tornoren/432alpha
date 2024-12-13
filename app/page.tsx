import AlphaWavePlayer from '../components/alpha-wave-player'

export default function AlphaWaveMusicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-purple-800 mb-6">432 Hz Alpha Wave Music</h1>
      <AlphaWavePlayer />
      <div className="mt-8 max-w-2xl text-center">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">About 432 Hz Alpha Wave Music</h2>
        <p className="text-gray-700 mb-4">
          432 Hz is said to be mathematically consistent with the patterns of the universe. It is said to be the frequency of nature and can bring about healing effects on our mind and body.
        </p>
        <p className="text-gray-700 mb-4">
          Alpha waves (8-12 Hz) are associated with relaxed alertness, restful and meditative states. Listening to music tuned to 432 Hz combined with alpha wave frequencies may promote relaxation, stress relief, and improved focus.
        </p>
        <p className="text-sm text-gray-500">
          Note: This player attempts to load audio from multiple sources. If you encounter issues, please ensure you have a stable internet connection and that your browser supports audio playback.
        </p>
      </div>
    </div>
  )
}

