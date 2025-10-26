import { useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from "react-icons/fa";

interface StylishVideoPlayerProps {
    src: string;
}

const StylishVideoPlayer: React.FC<StylishVideoPlayerProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) video.play();
        else video.pause();

        setIsPlaying(!video.paused);
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video) return;
        setProgress((video.currentTime / video.duration) * 100);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        video.volume = newVolume;
        setMuted(newVolume === 0);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setMuted(video.muted);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const video = videoRef.current;
        if (!video) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * video.duration;
        video.currentTime = newTime;
        setProgress((newTime / video.duration) * 100);
    };

    const toggleFullscreen = () => {
        const container = containerRef.current;
        if (!container) return;

        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => console.error(err));
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div ref={containerRef} className="max-w-xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            <div className="relative group">
                <video
                    ref={videoRef}
                    src={src}
                    className="w-full h-auto rounded-xl transition-transform duration-300 transform group-hover:scale-105"
                    onTimeUpdate={handleTimeUpdate}
                />
                <div className="absolute bottom-0 left-0 w-full px-4 py-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={togglePlay}
                            className="text-white text-2xl hover:text-yellow-400 transition-colors duration-200"
                        >
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={toggleMute}
                                className="text-white hover:text-yellow-400 transition-colors duration-200"
                            >
                                {muted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-24 h-1 rounded-lg appearance-none bg-gray-700 accent-yellow-400 cursor-pointer"
                            />
                        </div>

                        <button
                            onClick={toggleFullscreen}
                            className="text-white hover:text-yellow-400 transition-colors duration-200"
                        >
                            <FaExpand />
                        </button>
                    </div>
                    <div
                        className="w-full h-3 bg-gray-700 rounded mt-2 overflow-hidden cursor-pointer"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="h-full bg-yellow-400 transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StylishVideoPlayer;
