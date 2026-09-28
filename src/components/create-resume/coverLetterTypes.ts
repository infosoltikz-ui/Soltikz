export interface CoverLetterData {
  id?: string
  name?: string
  salutation: string
  paragraphs: string[]
  sign_off: string
}

export interface CoverLetterResponseData {
  variations: CoverLetterData[]
}
