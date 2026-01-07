
export interface ImageData {
  base64: string;
  mimeType: string;
  url: string;
}

export interface EditHistoryItem {
  id: string;
  timestamp: number;
  prompt: string;
  resultUrl: string;
}
