import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt=""
          styled={{ marginBottom: 10 }}
          height={200}
        />
        <Circle color="#2CAC1D" size={60} />;
      </div>
    </center>
  );
}

export default Loading;
