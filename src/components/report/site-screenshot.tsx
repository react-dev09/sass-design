'use client';

import { useState, useEffect } from 'react';
import * as React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, ExternalLink, Maximize2, X, Download } from 'lucide-react';
import { getDomain } from '@/lib/utils';

interface SiteScreenshotProps {
  screenshotUrl: string | null;
  siteUrl: string;
  title?: string;
  deviceType?: 'desktop' | 'mobile';
}

type ScreenshotType = 'desktop' | 'mobile' | 'fullpage';

interface ScreenshotConfig {
  width: number;
  height: number;
  viewport: string;
}

const screenshotConfigs: Record<ScreenshotType, ScreenshotConfig> = {
  desktop: { width: 1280, height: 720, viewport: '1280x720' },
  mobile: { width: 375, height: 812, viewport: '375x812' },
  fullpage: { width: 1280, height: 1600, viewport: '1280x1600' },
};

export function SiteScreenshot({ screenshotUrl, siteUrl, title, deviceType = 'desktop' }: SiteScreenshotProps) {
  const [lightbox, setLightbox] = useState(false);
  const [activeTab, setActiveTab] = useState<ScreenshotType>('desktop');
  const [screenshots, setScreenshots] = useState<Record<ScreenshotType, string | null>>({
    desktop: null,
    mobile: null,
    fullpage: null,
  });
  const [isCapturing, setIsCapturing] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    console.log('📸 [SCREENSHOT] Component mounted');
    console.log('   - Site URL:', siteUrl);
    captureAllScreenshots();
  }, [siteUrl]);

  const captureScreenshot = async (type: ScreenshotType) => {
    try {
      const config = screenshotConfigs[type];
      const response = await fetch('/api/screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: siteUrl,
          width: config.width,
          height: config.height,
          fullPage: type === 'fullpage',
        }),
      });

      const data = await response.json();
      if (data.screenshotUrl) {
        setScreenshots(prev => ({ ...prev, [type]: data.screenshotUrl }));
        console.log(`✅ [SCREENSHOT] ${type.toUpperCase()} screenshot captured`);
      }
    } catch (error) {
      console.error(`❌ [SCREENSHOT] Failed to capture ${type}:`, error);
    }
  };

  const captureAllScreenshots = async () => {
    setIsCapturing(true);
    const types: ScreenshotType[] = ['desktop', 'mobile', 'fullpage'];
    for (const type of types) {
      await captureScreenshot(type);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setIsCapturing(false);
  };

  const downloadScreenshot = (type: ScreenshotType) => {
    const screenshot = screenshots[type];
    if (!screenshot) return;

    const link = document.createElement('a');
    link.href = screenshot;
    link.download = `${getDomain(siteUrl)}-${type}-screenshot.png`;
    link.click();
  };

  const getViewportClass = () => {
    switch (activeTab) {
      case 'mobile':
        return 'h-96 px-4';
      case 'fullpage':
        return 'min-h-[600px]';
      case 'desktop':
      default:
        return 'aspect-video';
    }
  };

  const getIframeWidth = () => {
    switch (activeTab) {
      case 'mobile':
        return 375;
      case 'fullpage':
        return 1280;
      case 'desktop':
      default:
        return '100%';
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Screenshot Type Tabs */}
        <div className="flex gap-2 pb-3" style={{ borderBottomColor: '#d5d6dc', borderBottomWidth: '1px' }}>
          <button
            onClick={() => setActiveTab('desktop')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-white"
            style={activeTab === 'desktop' ? { backgroundColor: '#9250e6' } : { backgroundColor: '#d5d6dc', color: '#000000' }}
          >
            <Monitor className="w-4 h-4" />
            Desktop {screenshots.desktop && '✓'}
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-white"
            style={activeTab === 'mobile' ? { backgroundColor: '#9250e6' } : { backgroundColor: '#d5d6dc', color: '#000000' }}
          >
            <Smartphone className="w-4 h-4" />
            Mobile {screenshots.mobile && '✓'}
          </button>
          <button
            onClick={() => setActiveTab('fullpage')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-white"
            style={activeTab === 'fullpage' ? { backgroundColor: '#9250e6' } : { backgroundColor: '#d5d6dc', color: '#000000' }}
          >
            <ExternalLink className="w-4 h-4" />
            Full Page {screenshots.fullpage && '✓'}
          </button>
        </div>

        {/* Preview Section */}
        <div className="rounded-xl border-0 overflow-hidden" style={{ backgroundColor: '#ebecf2' }}>
          <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: '#d5d6dc', borderBottomColor: '#c0c1cc', borderBottomWidth: '1px' }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex-1 rounded px-3 py-1 text-xs truncate" style={{ backgroundColor: '#c0c1cc', color: '#000000' }}>
              {siteUrl}
            </div>
            <div className="flex gap-1">
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded transition-colors"
                style={{ color: '#000000' }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              {screenshots[activeTab] && (
                <>
                  <button
                    onClick={() => setLightbox(true)}
                    className="p-1.5 rounded transition-colors"
                    title="Fullscreen"
                    style={{ color: '#000000' }}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => downloadScreenshot(activeTab)}
                    className="p-1.5 rounded transition-colors"
                    title="Download screenshot"
                    style={{ color: '#000000' }}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={`relative overflow-auto flex items-center justify-center ${getViewportClass()}`} style={{ backgroundColor: '#f5f5f5' }}>
            <div style={{
              width: activeTab === 'mobile' ? '375px' : '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <iframe
                key={`${siteUrl}-${activeTab}`}
                src={siteUrl}
                title={`${activeTab} preview of ${getDomain(siteUrl)}`}
                style={{
                  width: activeTab === 'mobile' ? '375px' : '100%',
                  height: activeTab === 'mobile' ? '812px' : '100%',
                  border: 'none',
                  borderRadius: activeTab === 'mobile' ? '16px' : '0',
                  boxShadow: activeTab === 'mobile' ? '0 20px 60px rgba(0,0,0,0.1)' : 'none',
                }}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
              />
            </div>
          </div>
        </div>

        {/* Info about screenshot loading */}
        {isCapturing && (
          <div className="text-xs text-center py-3" style={{ color: '#666666' }}>
            📸 Capturing screenshots... this may take a moment
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && screenshots[activeTab] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
            onClick={() => setLightbox(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={screenshots[activeTab]!}
            alt={`${activeTab} site screenshot`}
            className="max-w-full max-h-full rounded-lg object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
