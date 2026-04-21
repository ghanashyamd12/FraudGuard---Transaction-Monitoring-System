import bgImage from "../assets/fraudguard-bg.png";

const BackgroundLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* 🔥 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-110"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 🔥 Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundLayout;