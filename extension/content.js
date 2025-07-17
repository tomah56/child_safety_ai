async function moderateText(text) {
  try {
    const response = await fetch('http://127.0.0.1:5000/moderate/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data || false;
  } catch (error) {
    console.error('Error moderating text:', error);
    return false;
  }
}

async function checkTextElement(element) {
  const text = element.innerText.trim() || '';
  if (!text || text.length === 0) {
    return false; // Skip empty elements
  }
  return await moderateText(text);
}

async function checkImageElement(element) {
  try {
    const imageUrl = element.src || element.getAttribute('src');
    const alttext = element.alt || '';
    if (alttext && alttext.length > 0) {
      const altTextFlagged = moderateText(alttext);
      if (altTextFlagged) {
        return true;
      }
    }

    if (typeof imageUrl === 'string' && imageUrl.includes('.svg')) {
      return false; // Skip SVG images
    }
    if (typeof imageUrl === 'string' && imageUrl.startsWith('data:image/png;base64')) {
      return false; // Skip data URLs
    }

    let finalUrl = imageUrl;
    if (typeof imageUrl === 'string' && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
      finalUrl = new URL(imageUrl, window.location.href).href;
    }
    const response = await fetch('http://127.0.0.1:5000/moderate/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: imageUrl })
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data || false;
  } catch (error) {
    console.error('Error moderating image:', error);
    return false;
  }
}


async function blurIncorrectParts(root) {
  const blockTags = ['P', 'A', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  const allElements = root.querySelectorAll('*');

  let checkedCount = 0;
  // for testing the objects checked in a website is limited
  for (let i = 0; i < allElements.length && checkedCount < 40; i++) {
    const el = allElements[i];
    let shouldBlur = false;

    if (el.tagName === 'IMG') {
      shouldBlur = await checkImageElement(el);
      checkedCount++;
    } else if (blockTags.includes(el.tagName)) {
      shouldBlur = await checkTextElement(el);
      checkedCount++;
    }

    if (shouldBlur) {
      el.classList.add('blur-content');
    }
  }
}

blurIncorrectParts(document.body);
