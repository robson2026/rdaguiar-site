import smtplib
import os
import sys
from email.mime.text import MIMEText

try:
    sender = os.environ['EMAIL_USER']
    password = os.environ['EMAIL_PASS']
    receiver = "oficial.rdaguiar@gmail.com"
    subject = os.environ['EMAIL_SUBJECT']
    body = os.environ['EMAIL_BODY']

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = receiver

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender, password)
        server.sendmail(sender, receiver, msg.as_string())
    print("Email enviado com sucesso!")
except Exception as e:
    print(f"Erro ao enviar: {e}")
    sys.exit(1)
