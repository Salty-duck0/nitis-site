const pic = document.querySelector('.profile-pic');
const wrapper = document.querySelector('.profile-wrapper');
const ring = document.querySelector('.progress-ring__circle');

if (pic && wrapper && ring) {
  const circumference = 2 * Math.PI * ring.r.baseVal.value;
  ring.style.setProperty('--c', circumference);

  const images = ['public/pixel-duck.png', 'public/cool-duck.png'];
  let index = 0;
  let timer;

  const start = (e) => {
    if (e.type === 'touchstart') e.preventDefault();
    wrapper.classList.add('pressing');
    timer = setTimeout(() => {
      wrapper.classList.remove('pressing');
      index = (index + 1) % images.length;
      pic.src = images[index];
      navigator.vibrate?.(50);
    }, 750);
  };

  const cancel = () => {
    clearTimeout(timer);
    wrapper.classList.remove('pressing');
  };

  pic.addEventListener('mousedown', start);
  pic.addEventListener('mouseup', cancel);
  pic.addEventListener('mouseleave', cancel);
  pic.addEventListener('touchstart', start, { passive: false });
  pic.addEventListener('touchend', cancel);
  pic.addEventListener('touchcancel', cancel);
  pic.addEventListener('contextmenu', (e) => e.preventDefault());
}

fetch('updates.json')
  .then((r) => r.json())
  .then(({ updates }) => {
    const list = document.getElementById('updates-list');
    if (!list || !updates?.length) return;
    list.innerHTML = updates
      .map(
        (u) =>
          `<li><span class="update-date">${u.date}</span><a class="link" href="${u.link}" target="_blank">${u.title}</a></li>`
      )
      .join('');
  })
  .catch(() => {});
