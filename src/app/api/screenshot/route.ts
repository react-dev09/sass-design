import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { url, width = 1280, height = 720, fullPage = false } = await request.json();

  if (!url) {
    console.log('❌ [API] No URL provided to screenshot API');
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    console.log('🖼️ [API] Processing screenshot request for:', url);
    console.log(`   Viewport: ${width}x${height}, Full Page: ${fullPage}`);

    // Try multiple screenshot services with fallbacks
    const services = [
      // Service 1: ApiFlash (more reliable with CORS)
      () => `https://api.apiflash.com/v1/urltoimage?access_key=4e3d99f0b5ce4f01a47e5adfdb60dc81&url=${encodeURIComponent(url)}&width=${width}&height=${height}&quality=80`,

      // Service 2: screenshotone (alternative)
      () => `https://api.screenshotone.com/take?access_key=free&url=${encodeURIComponent(url)}&viewport_width=${width}&viewport_height=${height}&full_page=${fullPage}`,

      // Service 3: thum.io (simple and reliable)
      () => `https://image.thum.io/get/width/${width}/height/${height}/${fullPage ? 'full' : ''}/${encodeURIComponent(url.replace(/^https?:\/\//, ''))}`,
    ];

    // Use the first service for now (ApiFlash)
    const screenshotUrl = services[0]();

    console.log('✅ [API] Generated screenshot URL:', screenshotUrl);

    return NextResponse.json({
      screenshotUrl,
      service: 'apiflash'
    });
  } catch (error) {
    console.error('❌ [API] Screenshot error:', error);
    return NextResponse.json(
      { error: 'Failed to generate screenshot' },
      { status: 500 }
    );
  }
}
