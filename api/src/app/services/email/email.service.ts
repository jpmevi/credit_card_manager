import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sentEmail(addressee: string, subject: string, text: string) {
    try {
      const mensaje = {
        from: process.env.MAIL_USERNAME,
        to: addressee,
        subject: subject,
        text: text,
      };
      await this.transporter.sendMail(mensaje);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
