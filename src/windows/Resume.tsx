import { WindowControls } from "#components"
import WindowWrapper from "#hoc/WindowWrapper"
import { Download } from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"
import { useLanguageStore } from "../store/language"
import useWindowStore from "#store/windows"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const Resume = () => {
  const { language } = useLanguageStore()
  const { windows } = useWindowStore()
  
  // Check if a specific file was passed via data, otherwise use current language
  const passedFile = windows.resume.data?.file
  const currentFile = passedFile || (language === 'es' ? 'cv_español.pdf' : 'resume.pdf')
  const fileName = passedFile ? (passedFile === 'cv_español.pdf' ? 'Curriculum.pdf' : 'Resume.pdf') : (language === 'es' ? 'Curriculum.pdf' : 'Resume.pdf')

  return <>
    <div id="window-header">
      <WindowControls target="resume" />
      <h2>{fileName}</h2>

      <a 
        href={`files/${currentFile}`}
        target="_blank"
        className="cursor-pointer"
        title="Download resume"
      >
        <Download className="icon" />
      </a>
    </div>

    <Document file={`files/${currentFile}`}>
      <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
    </Document>
  </>
}

const ResumeWindow = WindowWrapper(Resume, "resume")

export default ResumeWindow