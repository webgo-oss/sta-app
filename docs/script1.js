   const images = [
    "/block1.png",
    "/block2.png",
    "/block3.png",
    "/block4.png",
    "/block1.png"
  ];

  const slider = document.getElementById("slider");
  const speed = 2; // pixels per frame
  const gapRatio = 0.02;
  const widthRatio = 0.2;

  let imgElems = [];
  let animationFrame;

  function setupSlider() {
    cancelAnimationFrame(animationFrame);
    slider.innerHTML = "";
    imgElems = [];

    const vw = window.innerWidth;
    const imageWidth = vw * widthRatio;
    const gap = vw * gapRatio;
    const totalWidth = images.length * (imageWidth + gap);
    const fullImages = [...images, ...images];

    fullImages.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "slide-img";
      img.style.width = imageWidth + "px";
      img.style.left = (i * (imageWidth + gap)) + "px";
      slider.appendChild(img);
      imgElems.push(img);
    });

    function animate() {
      const gap = window.innerWidth * gapRatio;
      const imageWidth = parseFloat(imgElems[0].style.width);

      imgElems.forEach(img => {
        let left = parseFloat(img.style.left);
        left -= speed;  
        if (left < -imageWidth) {
          const rightMost = Math.max(...imgElems.map(i => parseFloat(i.style.left)));
          left = rightMost + imageWidth + gap;
        }

        img.style.left = left + "px";
      });

      animationFrame = requestAnimationFrame(animate);
    }

    animate();
  }

  setupSlider();
  window.addEventListener("resize", setupSlider);
   const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');
  const closeBtn = document.getElementById('close-btn');

  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
    sidebar.classList.toggle('hidden');
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('visible');
    sidebar.classList.add('hidden');
  });
  mainContent.addEventListener('click', () => {
    if (sidebar.classList.contains('visible')) {
      sidebar.classList.remove('visible');
      sidebar.classList.add('hidden');
    }
  });
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (sidebar.classList.contains('visible')) {
        sidebar.classList.remove('visible');
        sidebar.classList.add('hidden');
      }
    });
  });
  function go(num){
    this.num=num
    localStorage.setItem('num',num)
    window.location.href='test.html'
  }
  document.querySelectorAll('.art-box').forEach((block)=>{
    block.addEventListener('click',()=>{
      window.location.href='text.html'
    })
  })