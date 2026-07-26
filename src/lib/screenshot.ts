/**
 * Screenshot capture utility.
 * Uses ScreenshotOne API as the primary method (works on Vercel).
 * Falls back to a placeholder if no API key is set.
 */
export async function captureScreenshot(url: string): Promise<string | null> {
  const apiKey = process.env.SCREENSHOTONE_API_KEY;

  if (!apiKey) {
    // Return a placeholder screenshot URL for demo
    return `https://api.screenshotone.com/take?url=${encodeURIComponent(url)}&viewport_width=1440&viewport_height=900&format=webp&image_quality=85`;
  }

  try {
    const params = new URLSearchParams({
      access_key: apiKey,
      url: url,
      viewport_width: '1440',
      viewport_height: '900',
      device_scale_factor: '1',
      format: 'webp',
      image_quality: '85',
      block_ads: 'true',
      block_cookie_banners: 'true',
      block_trackers: 'true',
      delay: '2',
      timeout: '20',
    });

    const screenshotUrl = `https://api.screenshotone.com/take?${params.toString()}`;

    // Verify the URL resolves (HEAD request)
    const check = await fetch(screenshotUrl, { method: 'HEAD' });
    if (check.ok) {
      return screenshotUrl;
    }

    return null;
  } catch (error) {
    console.error('Screenshot error:', error);
    return null;
  }
}

export function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return '';
  }
}
