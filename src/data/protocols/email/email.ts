type infoEmail = {
  name: string
  address: string
}

export type emailParams = {
  to: infoEmail
  subject: string
  html: string
}

export interface eMail {
  sendEmail: (email: emailParams) => Promise<void>
}
