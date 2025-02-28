export const DownloadButton = ({ video, image, musik }: { video?: string; image?: string; musik?: string }) => {
  const handleDownload = async () => {
    const fileUrl = video || image || musik;

    if (!fileUrl) {
      console.error('keine url link');
      return;
    }

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Fehler herunterladen');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileUrl.split('/').pop() || 'download';

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Fehler herunterladen', error);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="55"
      height="55"
      viewBox="0 0 55 55"
      fill="none"
      onClick={handleDownload}
      className="absolute top-1.5 right-17">
      <rect
        x="55"
        y="55"
        width="55"
        height="55"
        rx="27.5"
        transform="rotate(-180 55 55)"
        fill="#E28F83"
        fillOpacity="0.5"
      />
      <path
        d="M33 24.4396L28 29.9753L23 24.4396M28 28.6467V17.2432M19 31.0824V35.511C19 36.7289 19.9 37.7253 21 37.7253H35C35.5304 37.7253 36.0391 37.492 36.4142 37.0767C36.7893 36.6615 37 36.0983 37 35.511V31.0824H19Z"
        stroke="#FAF2DA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
