import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import CustomCursor from "@/components/site/CustomCursor";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Manifesto from "@/components/site/Manifesto";
import Insight from "@/components/site/Insight";
import Film from "@/components/site/Film";
import Archive from "@/components/site/Archive";
import Upload from "@/components/site/Upload";
import CaseFile from "@/components/site/CaseFile";
import Ooh from "@/components/site/Ooh";
import Retail from "@/components/site/Retail";
import Social from "@/components/site/Social";
import Footer from "@/components/site/Footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.09 });
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <div className="App" id="top">
      <CustomCursor />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1c1a16", color: "#ede6d8",
            border: "1px solid #a83b32", borderRadius: 0,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px",
          },
        }}
      />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Insight />
        <Film />
        <Archive />
        <Upload />
        <CaseFile />
        <Ooh />
        <Retail />
        <Social />
      </main>
      <Footer />
    </div>
  );
}

export default App;
