import { useState, useEffect } from "react";

const messages = [
  "Connecting Farmers...",
  "Verifying Blockchain...",
  "Tracking Supply Chain...",
  "Loading Dashboard...",
];

export default function AgroChainLoadingPage() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const msg = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1200);

    return () => clearInterval(msg);
  }, []);

  return (
    <>
      <style>{`
      *{
      box-sizing:border-box;
      }

      @keyframes float{
        0%,100%{transform:translateY(0px);}
        50%{transform:translateY(-18px);}
      }

      @keyframes pulse{
        0%,100%{
          transform:scale(1);
          opacity:1;
        }
        50%{
          transform:scale(1.6);
          opacity:.6;
        }
      }

      @keyframes truck{
        from{
          transform:translateX(-220px);
        }
        to{
          transform:translateX(220px);
        }
      }

      @keyframes rotate{
        from{
          transform:rotate(0deg);
        }
        to{
          transform:rotate(360deg);
        }
      }

      @keyframes shine{
        from{
          left:-30%;
        }
        to{
          left:130%;
        }
      }

      @keyframes fade{
        from{
          opacity:0;
          transform:translateY(20px);
        }
        to{
          opacity:1;
          transform:translateY(0);
        }
      }

      .loading-page{
        height:100vh;
        overflow:hidden;
        position:relative;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        background:
        radial-gradient(circle at top right,#6ee7b7 0%,transparent 35%),
        radial-gradient(circle at bottom left,#fbbf24 0%,transparent 35%),
        linear-gradient(135deg,#0f2d14,#1a5c2a,#2d8a45);
        color:white;
        font-family:Inter,sans-serif;
      }

      .blob{
        position:absolute;
        border-radius:50%;
        filter:blur(90px);
        opacity:.25;
      }

      .logo-ring{
        position:absolute;
        width:180px;
        height:180px;
        border:2px dashed rgba(255,255,255,.15);
        border-radius:50%;
        animation:rotate 12s linear infinite;
      }

      .logo{
        animation:fade 1s ease;
        text-align:center;
        z-index:5;
      }

      .logo h1{
        margin:0;
        font-size:48px;
      }

      .logo p{
        margin-top:8px;
        color:#d1fae5;
        letter-spacing:2px;
      }

      .supply{
        margin-top:45px;
        position:relative;
        width:420px;
        height:60px;
      }

      .line{
        position:absolute;
        width:100%;
        height:4px;
        top:28px;
        background:rgba(255,255,255,.2);
      }

      .truck{
        position:absolute;
        top:-10px;
        font-size:40px;
        animation:truck 4s linear infinite;
      }

      .nodes{
        position:absolute;
        display:flex;
        width:100%;
        justify-content:space-between;
        top:20px;
      }

      .node{
        width:14px;
        height:14px;
        border-radius:50%;
        background:#22c55e;
        animation:pulse 1.5s infinite;
      }

      .message{
        margin-top:35px;
        font-size:22px;
        font-weight:600;
        color:#d1fae5;
      }

      .progress{
        width:380px;
        height:12px;
        background:rgba(255,255,255,.15);
        border-radius:30px;
        overflow:hidden;
        margin-top:20px;
      }

      .progress-fill{
        position:relative;
        height:100%;
        border-radius:30px;
        background:linear-gradient(90deg,#22c55e,#84cc16,#f59e0b);
      }

      .progress-fill::after{
        content:"";
        position:absolute;
        width:40%;
        top:0;
        bottom:0;
        background:rgba(255,255,255,.4);
        transform:skewX(-25deg);
        animation:shine 2s infinite;
      }

      .stats{
        margin-top:50px;
        display:flex;
        gap:20px;
      }

      .card{
        width:160px;
        padding:18px;
        border-radius:18px;
        backdrop-filter:blur(15px);
        background:rgba(255,255,255,.08);
        border:1px solid rgba(255,255,255,.15);
        animation:fade 1s ease;
      }

      .card h2{
        margin:8px 0 2px;
      }

      .floating{
        position:absolute;
        font-size:42px;
        animation:float 5s ease-in-out infinite;
      }

      `}</style>

      <div className="loading-page">

        <div className="blob" style={{width:320,height:320,background:"#22c55e",top:-60,left:-80}}/>
        <div className="blob" style={{width:280,height:280,background:"#f59e0b",bottom:-60,right:-60}}/>

        <div className="floating" style={{top:"12%",left:"10%"}}>🌾</div>
        <div className="floating" style={{top:"18%",right:"15%",animationDelay:"1s"}}>🚜</div>
        <div className="floating" style={{bottom:"12%",left:"15%",animationDelay:"2s"}}>🌱</div>
        <div className="floating" style={{bottom:"18%",right:"12%",animationDelay:"3s"}}>📦</div>

        <div className="logo-ring"/>

        <div className="logo">
          <div style={{fontSize:70}}>🌿</div>
          <h1>AgroChain</h1>
          <p>BLOCKCHAIN AGRICULTURE</p>
        </div>

        <div className="supply">

          <div className="line"/>

          <div className="truck">
            🚛
          </div>

          <div className="nodes">
            <div className="node"/>
            <div className="node" style={{animationDelay:".3s"}}/>
            <div className="node" style={{animationDelay:".6s"}}/>
            <div className="node" style={{animationDelay:".9s"}}/>
            <div className="node" style={{animationDelay:"1.2s"}}/>
          </div>

        </div>

        <div className="message">
          {messages[messageIndex]}
        </div>

        <div className="progress">
          <div
            className="progress-fill"
            style={{width:`${progress}%`}}
          />
        </div>

        <div style={{marginTop:10,fontWeight:600}}>
          {progress}%
        </div>

        <div className="stats">

          <div className="card">
            🌾
            <h2>3400+</h2>
            <div>Farmers</div>
          </div>

          <div className="card">
            🚛
            <h2>58</h2>
            <div>Shipments</div>
          </div>

          <div className="card">
            📊
            <h2>99.9%</h2>
            <div>Transparency</div>
          </div>

        </div>

      </div>
    </>
  );
}