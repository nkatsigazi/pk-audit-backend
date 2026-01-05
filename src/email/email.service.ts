import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'user',
        pass: 'pass',
      },
    });
  }

  async sendNotification(type: string, data: any, to: string = 'admin@example.com') {
    await this.transporter.sendMail({
      from: 'no-reply@example.com',
      to,
      subject: `Notification: ${type}`,
      text: JSON.stringify(data),
    });
  }
}