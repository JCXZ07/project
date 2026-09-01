document.addEventListener('DOMContentLoaded', function() {
  const pageFlip = new St.PageFlip(
    document.getElementById('book'),
    {
      width: 350,
      height: 500,
      size: 'fixed',
      minWidth: 300,
      maxWidth: 400,
      minHeight: 400,
      maxHeight: 600,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: false
    }
  );

  pageFlip.loadFromHTML(document.querySelectorAll('.page'));
});
