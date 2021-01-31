import { eMail, emailParams } from '@/data/protocols/email/email'
import nodemailer, { Transporter } from 'nodemailer'

export class EmailAdapter implements eMail {
  constructor (private readonly client: Transporter) {}

  async sendEmail ({ to, subject, html }: emailParams): Promise<void> {
    const info = await this.client.sendMail({
      from: {
        name: 'Jounal',
        address: 'journalcarlucci@mailinator.com'
      },
      to,
      subject,
      html
    })
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  }
}
