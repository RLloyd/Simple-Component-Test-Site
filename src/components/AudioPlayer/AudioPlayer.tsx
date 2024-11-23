//src/components/AudioPlayer/AudioPlayer.tsx

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download, Settings } from "lucide-react";
// import { Slider } from "@/components/ui/slider";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select";
import { Slider } from "@radix-ui/react-slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface AudioPlayerProps {
	src: string;
	title?: string;
	autoPlay?: boolean;
	loop?: boolean;
	onPlay?: () => void;
	onPause?: () => void;
	onEnded?: () => void;
	initialVolume?: number;
	className?: string;
	allowDownload?: boolean;
}

const formatTime = (seconds: number): string => {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title = "Untitled Track", autoPlay = false, loop = false, onPlay, onPause, onEnded, initialVolume = 1, className = "", allowDownload = false }) => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(initialVolume);
	const [isMuted, setIsMuted] = useState(false);
	const [playbackRate, setPlaybackRate] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [buffered, setBuffered] = useState(0);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
		const handleDurationChange = () => setDuration(audio.duration);
		const handleEnded = () => {
			setIsPlaying(false);
			onEnded?.();
		};
		const handleError = () => setError("Error loading audio file");
		const handleCanPlay = () => setIsLoading(false);
		const handleProgress = () => {
			if (audio.buffered.length > 0) {
				setBuffered(audio.buffered.end(audio.buffered.length - 1));
			}
		};

		audio.addEventListener("timeupdate", handleTimeUpdate);
		audio.addEventListener("durationchange", handleDurationChange);
		audio.addEventListener("ended", handleEnded);
		audio.addEventListener("error", handleError);
		audio.addEventListener("canplay", handleCanPlay);
		audio.addEventListener("progress", handleProgress);

		return () => {
			audio.removeEventListener("timeupdate", handleTimeUpdate);
			audio.removeEventListener("durationchange", handleDurationChange);
			audio.removeEventListener("ended", handleEnded);
			audio.removeEventListener("error", handleError);
			audio.removeEventListener("canplay", handleCanPlay);
			audio.removeEventListener("progress", handleProgress);
		};
	}, [onEnded]);

	const togglePlay = () => {
		if (!audioRef.current) return;
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
			onPause?.();
		} else {
			audioRef.current.play();
			setIsPlaying(true);
			onPlay?.();
		}
	};

	const handleSeek = (value: number[]) => {
		if (!audioRef.current) return;
		const newTime = value[0];
		audioRef.current.currentTime = newTime;
		setCurrentTime(newTime);
	};

	const handleVolumeChange = (value: number[]) => {
		if (!audioRef.current) return;
		const newVolume = value[0];
		audioRef.current.volume = newVolume;
		setVolume(newVolume);
		setIsMuted(newVolume === 0);
	};

	const toggleMute = () => {
		if (!audioRef.current) return;
		const newMuted = !isMuted;
		audioRef.current.volume = newMuted ? 0 : volume;
		setIsMuted(newMuted);
	};

	const skip = (seconds: number) => {
		if (!audioRef.current) return;
		audioRef.current.currentTime = Math.min(Math.max(currentTime + seconds, 0), duration);
	};

	const handleSpeedChange = (value: string) => {
		if (!audioRef.current) return;
		const speed = parseFloat(value);
		audioRef.current.playbackRate = speed;
		setPlaybackRate(speed);
	};

	return (
		<div className={`w-full max-w-2xl p-4 rounded-lg bg-white shadow-lg ${className}`}>
			<audio ref={audioRef} src={src} autoPlay={autoPlay} loop={loop} preload="metadata" />

			{/* Title */}
			<div className="mb-4 text-lg font-semibold">{title}</div>

			{/* Error State */}
			{error && (
				<div className="text-red-500 mb-2" role="alert">
					{error}
				</div>
			)}

			{/* Loading State */}
			{isLoading && <div className="text-gray-500 mb-2">Loading audio...</div>}

			{/* Progress Bar */}
			<div className="mb-4">
				<Slider value={[currentTime]} min={0} max={duration || 100} step={0.1} onValueChange={handleSeek} aria-label="Seek timeline" className="w-full" />
				<div className="flex justify-between text-sm text-gray-500 mt-1">
					<span>{formatTime(currentTime)}</span>
					<span>{formatTime(duration)}</span>
				</div>
			</div>

			{/* Controls */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center space-x-4">
					<button onClick={() => skip(-10)} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Skip backward 10 seconds">
						<SkipBack className="w-5 h-5" />
					</button>

					<button onClick={togglePlay} className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white" aria-label={isPlaying ? "Pause" : "Play"}>
						{isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
					</button>

					<button onClick={() => skip(10)} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Skip forward 10 seconds">
						<SkipForward className="w-5 h-5" />
					</button>
				</div>

				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-2">
						<button onClick={toggleMute} className="p-2 hover:bg-gray-100 rounded-full" aria-label={isMuted ? "Unmute" : "Mute"}>
							{isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
						</button>
						<Slider value={[isMuted ? 0 : volume]} min={0} max={1} step={0.01} onValueChange={handleVolumeChange} aria-label="Volume" className="w-24" />
					</div>

					<Select value={playbackRate.toString()} onValueChange={handleSpeedChange}>
						<SelectTrigger className="w-20">
							<SelectValue placeholder="Speed" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="0.5">0.5x</SelectItem>
							<SelectItem value="1">1x</SelectItem>
							<SelectItem value="1.5">1.5x</SelectItem>
							<SelectItem value="2">2x</SelectItem>
						</SelectContent>
					</Select>

					{allowDownload && (
						<a href={src} download className="p-2 hover:bg-gray-100 rounded-full" aria-label="Download audio">
							<Download className="w-5 h-5" />
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default AudioPlayer;
