from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

def send_custom_email(subject, recipient_list, template_name, context=None):
    """
    Función reutilizable para enviar correos electrónicos.
    :param subject: Asunto del correo
    :param recipient_list: Lista de correos destino ['ejemplo@correo.com']
    :param template_name: Ruta del archivo .html (ej. 'emails/bienvenida.html')
    :param context: Diccionario con variables para el template
    """
    if context is None:
        context = {}

    # 1. Renderizar el contenido HTML
    html_content = render_to_string(template_name, context)
    
    # 2. Crear una versión en texto plano (para clientes que no soportan HTML)
    text_content = strip_tags(html_content)

    # 3. Configurar el correo
    email = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=recipient_list
    )
    email.attach_alternative(html_content, "text/html")

    # 4. Enviar
    return email.send(fail_silently=False)