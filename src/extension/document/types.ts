export interface FetchReplaceType {
  config?: RequestInit
  res: Response
  urlInfo: {
    path: string
    params: string
  }
}