
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
    window.location.href='/test.html'
  }
  document.querySelectorAll('.art-box').forEach((block)=>{
    block.addEventListener('click',()=>{
      window.location.href='/text.html'
    })
  })