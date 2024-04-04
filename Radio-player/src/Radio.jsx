import { useEffect, useState } from "react";

const URL = "https://api.sr.se/api/v2/channels?format=json&size=100";

export default function Radio() {
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("failed to fetch resoureces");
        }
        const jsonData = await response.json();
        setChannels(jsonData.channels);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

  const handlePlay = (channel) => {
    currentChannel && currentChannel.id === channel.id
      ? setCurrentChannel(null)
      : setCurrentChannel(channel);
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      {channels.map((channel, index) => (
        <div key={index} className="flex flex-col items-center">
          <img
            src={channel.image}
            alt={channel.name}
            className="w-20 rounded-xl mb-2"
          />
          <button
            className="bg-blue-600 text-white px-6 py-0. rounded-xl transition-colors duration-900 ease-in-out hover:bg-blue-500"
            onClick={() => handlePlay(channel)}
          >
            {currentChannel && currentChannel.id === channel.id
              ? "Pause"
              : "Play"}
          </button>
          {currentChannel && currentChannel.id === channel.id && (
            <audio controls autoPlay className="mt-2 w-48 p-2">
              <source src={currentChannel.liveaudio.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      ))}
    </div>
  );
}
