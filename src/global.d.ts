// Делаем так, чтобы TypeScript мог распознавать файлы .mp3
declare module '*.mp3' {
  const content: string;
  export default content;
}
