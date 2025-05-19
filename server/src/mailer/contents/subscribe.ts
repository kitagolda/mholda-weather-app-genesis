export const buildSubscribeEmailContent = (
  city: string,
  confirmationLink: string
) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm Your Subscription</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          background-color: #007bff;
          color: #ffffff;
          padding: 10px 0;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
          text-align: center;
        }
        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #888888;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Confirm Your Subscription</h1>
        </div>
        <div class="content">
          <p>Thank you for subscribing to weather updates for <strong>${city}</strong>.</p>
          <p>Please confirm your subscription by clicking the button below:</p>
          <a href="${confirmationLink}" class="button">Confirm Subscription</a>
        </div>
        <div class="footer">
          <p>If you did not request this subscription, you can safely ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
