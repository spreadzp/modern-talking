export const collapseAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function reworkYouTubeUrl(url: string) {
  // Regular expression to match YouTube watch URLs
  const youtubeWatchRegex = /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

  // Check if the URL matches the YouTube watch URL pattern
  const match = url.match(youtubeWatchRegex);

  if (match) {
    // Extract the video ID from the matched URL
    const videoId = match[1];
    // Construct the embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return embedUrl;
  } else {
    // Return the original URL if it's not a YouTube watch URL
    return url;
  }
}
