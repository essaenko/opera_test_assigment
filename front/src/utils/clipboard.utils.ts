export const copyToClipboard = async (data: string) => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(data);
    alert("Text was copied to clipboard");
  }
}