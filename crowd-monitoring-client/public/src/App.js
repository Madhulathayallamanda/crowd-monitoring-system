import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaBell, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";

function App() {
  const [locations, setLocations] = useState({});
  const [selected, setSelected] = useState(null);
  const [alert, setAlert] = useState("");
  const [animateAlert, setAnimateAlert] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("aiUpdate", (data) => {
      setLocations((prev) => ({
        ...prev,
        [data.location]: data
      }));
    });

    socket.on("aiAlert", (data) => {
      if (data.location === selected) {
        setAlert(data.message);
        setAnimateAlert(true);

        const audio = new Audio(
          "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        );
        audio.play();

        setTimeout(() => setAnimateAlert(false), 2000);
      }
    });

    return () => socket.disconnect();
  }, [selected]);

  const getStatus = (percent) => {
    if (percent < 60) return { text: "SAFE", color: "#00ff99" };
    if (percent < 80) return { text: "MODERATE", color: "#ffaa00" };
    return { text: "CRITICAL", color: "#ff0040" };
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const selectedData = locations[selected];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ color: "#00f7ff" }}>AI Monitor</h2>

        {Object.values(locations).map((loc) => (
          <div
            key={loc.location}
            onClick={() => {
              setSelected(loc.location);
              setAlert("");
            }}
            style={{
              ...styles.locationItem,
              background:
                selected === loc.location
                  ? "rgba(0,255,255,0.2)"
                  : "transparent"
            }}
          >
            <FaMapMarkerAlt style={{ marginRight: 8 }} />
            {loc.location}
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={styles.main}>
        {/* Top Bar */}
        <div style={styles.topbar}>
          <h1>🚀 Crowd Intelligence</h1>
          <button onClick={logout} style={styles.logout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {selectedData ? (
          <div style={styles.card}>
            <h2>{selectedData.location}</h2>

            <h3>
              {selectedData.count} / {selectedData.capacity} (
              {selectedData.percent}%)
            </h3>

            <div
              style={{
                ...styles.statusBadge,
                background: getStatus(selectedData.percent).color
              }}
            >
              {getStatus(selectedData.percent).text}
            </div>

            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${selectedData.percent}%`,
                  background: getStatus(selectedData.percent).color
                }}
              />
            </div>

            {alert && (
              <div
                style={{
                  ...styles.alertBox,
                  animation: animateAlert
                    ? "pulse 0.5s infinite alternate"
                    : "none"
                }}
              >
                <FaBell style={{ marginRight: 8 }} />
                {alert}
              </div>
            )}
          </div>
        ) : (
          <h2 style={{ marginTop: 50, color: "#aaa" }}>
            Select a location
          </h2>
        )}
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes pulse {
            from { transform: scale(1); }
            to { transform: scale(1.05); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Segoe UI",
    background: "#0f172a",
    color: "white"
  },
  sidebar: {
    width: 260,
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    padding: 20,
    borderRight: "1px solid rgba(255,255,255,0.1)"
  },
  locationItem: {
    padding: 12,
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 10,
    display: "flex",
    alignItems: "center"
  },
  main: {
    flex: 1,
    padding: 40
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logout: {
    padding: "8px 15px",
    background: "#ff0040",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6
  },
  card: {
    marginTop: 40,
    padding: 40,
    borderRadius: 20,
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 0 40px rgba(0,255,255,0.2)",
    maxWidth: 600
  },
  statusBadge: {
    marginTop: 20,
    padding: "8px 20px",
    borderRadius: 20,
    color: "black",
    fontWeight: "bold",
    display: "inline-block"
  },
  progressBar: {
    marginTop: 20,
    height: 12,
    background: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    transition: "width 0.5s ease"
  },
  alertBox: {
    marginTop: 20,
    padding: 15,
    background: "#ff0040",
    borderRadius: 10,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center"
  }
};

export default App;

