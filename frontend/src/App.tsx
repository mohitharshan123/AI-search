import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTracks = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/tracks?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks("");
  }, []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQuerySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchTracks(query);
  };

  return (
    <div className="App">
      <h1>Billboard 2025</h1>

      <form onSubmit={handleQuerySubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="AI search tracks..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="loading-text">Loading...</p>}

      <div className="track-list">
        {tracks.length === 0 ? (
          <p>No tracks found</p>
        ) : (
          <ul>
            {tracks.map((track: any) => (
              <li key={track.TrackId} className="track-item">
                <div className="track-info">
                  <strong>{track.Name}</strong>
                  <p>Track ID: {track.TrackId}</p>
                  <p>Album ID: {track.AlbumId}</p>
                  <p>Composer: {track.Composer}</p>
                  <p>Duration: {track.Milliseconds} ms</p>
                  <p>Price: ${track.UnitPrice}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
