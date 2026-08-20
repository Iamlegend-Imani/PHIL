from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "PHIL_Project_Brief.pdf"
HERO = ROOT / "docs" / "assets" / "prototype-hero.jpg"

PAGE_W, PAGE_H = letter

INK = HexColor("#0B100F")
INK_SOFT = HexColor("#151D1A")
IVORY = HexColor("#F4F0E7")
PAPER = HexColor("#EEE9DE")
BODY = HexColor("#3E4743")
MUTED = HexColor("#6F7772")
TEAL = HexColor("#2E8379")
TEAL_LIGHT = HexColor("#58B4A7")
GOLD = HexColor("#B69B50")
LINE = HexColor("#CFC8BA")


def register_fonts():
    pdfmetrics.registerFont(TTFont("PhilSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont("PhilSansBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
    pdfmetrics.registerFont(TTFont("PhilSerif", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"))
    pdfmetrics.registerFont(TTFont("PhilSerifBold", "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"))


def paragraph(c, text, x, y_top, width, font="PhilSans", size=8.2, leading=12, color=BODY):
    style = ParagraphStyle(
        name="body",
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=0,
    )
    p = Paragraph(text, style)
    _, height = p.wrap(width, PAGE_H)
    p.drawOn(c, x, y_top - height)
    return y_top - height


def section_label(c, text, x, y):
    c.setFont("PhilSansBold", 6.5)
    c.setFillColor(GOLD)
    c.drawString(x, y, text.upper())


def divider(c, x, y, width):
    c.setStrokeColor(LINE)
    c.setLineWidth(0.55)
    c.line(x, y, x + width, y)


def numbered_step(c, number, title, body, x, y, width):
    c.setStrokeColor(TEAL)
    c.setLineWidth(0.8)
    c.circle(x + 9, y - 7, 8, stroke=1, fill=0)
    c.setFont("PhilSerif", 6.6)
    c.setFillColor(GOLD)
    c.drawCentredString(x + 9, y - 9, number)
    c.setFont("PhilSansBold", 7.4)
    c.setFillColor(INK_SOFT)
    c.drawString(x + 26, y - 5, title)
    paragraph(c, body, x + 26, y - 9, width - 26, size=6.8, leading=9.2, color=MUTED)


def bullet(c, text, x, y, width):
    c.setFillColor(TEAL)
    c.circle(x + 2.5, y - 3, 1.7, stroke=0, fill=1)
    return paragraph(c, text, x + 10, y, width - 10, size=7.1, leading=9.5, color=BODY)


def status_row(c, label, detail, x, y, width, color):
    c.setFillColor(color)
    c.roundRect(x, y - 13, 48, 13, 6.5, stroke=0, fill=1)
    c.setFont("PhilSansBold", 5.5)
    c.setFillColor(IVORY)
    c.drawCentredString(x + 24, y - 9, label.upper())
    c.setFont("PhilSans", 6.7)
    c.setFillColor(BODY)
    c.drawString(x + 57, y - 9, detail)


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    register_fonts()
    c = canvas.Canvas(str(OUTPUT), pagesize=letter)
    c.setTitle("PHIL | Personal Health Intelligence Layer | Project Brief")
    c.setAuthor("Imani Kirika")
    c.setSubject("Patient-controlled visit preparation concept prototype")

    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    header_h = 244
    c.setFillColor(INK)
    c.rect(0, PAGE_H - header_h, PAGE_W, header_h, stroke=0, fill=1)

    c.setStrokeColor(TEAL_LIGHT)
    c.setLineWidth(0.8)
    c.circle(57, 738, 16, stroke=1, fill=0)
    c.setStrokeColor(GOLD)
    c.circle(57, 738, 11, stroke=1, fill=0)
    c.setFillColor(IVORY)
    c.setFont("PhilSerif", 12)
    c.drawCentredString(57, 734, "P")

    c.setFont("PhilSerif", 17)
    c.setFillColor(IVORY)
    c.drawString(82, 742, "PHIL")
    c.setFont("PhilSans", 5.6)
    c.setFillColor(HexColor("#87908A"))
    c.drawString(82, 728, "PERSONAL HEALTH INTELLIGENCE LAYER")

    c.setFont("PhilSansBold", 6.2)
    c.setFillColor(GOLD)
    c.drawString(42, 690, "PATIENT-CONTROLLED HEALTH CONTEXT")

    c.setFont("PhilSerif", 29)
    c.setFillColor(IVORY)
    c.drawString(42, 650, "Your health is not fragmented.")
    c.setFillColor(TEAL_LIGHT)
    c.drawString(42, 615, "Your health data is.")

    paragraph(
        c,
        "PHIL turns scattered health information and lived experience into a clear, source-aware brief for a better clinical conversation.",
        42,
        585,
        420,
        size=9.2,
        leading=13.5,
        color=HexColor("#B9BDB7"),
    )

    c.setFillColor(HexColor("#18302B"))
    c.roundRect(454, 685, 116, 58, 12, stroke=0, fill=1)
    c.setFont("PhilSansBold", 5.8)
    c.setFillColor(GOLD)
    c.drawString(468, 726, "STATUS")
    c.setFont("PhilSerif", 10)
    c.setFillColor(IVORY)
    c.drawString(468, 706, "Functional concept")
    c.setFont("PhilSans", 6.2)
    c.setFillColor(HexColor("#91A098"))
    c.drawString(468, 694, "Fictional data only")

    left_x, right_x = 42, 322
    left_w, right_w = 244, 248
    body_top = 522

    section_label(c, "The opportunity", left_x, body_top)
    y = paragraph(
        c,
        "Health information is stored by source, while the patient carries the connections among symptoms, routines, records, access, and what life can realistically hold. PHIL explores whether better preparation can make that story more usable before a scheduled visit.",
        left_x,
        body_top - 16,
        left_w,
        size=7.5,
        leading=10.8,
    )
    y -= 13
    divider(c, left_x, y, left_w)
    y -= 21
    section_label(c, "The proposed workflow", left_x, y)
    y -= 18
    numbered_step(c, "01", "Gather the fragments", "Patient story, records, routines, and practical constraints.", left_x, y, left_w)
    y -= 42
    numbered_step(c, "02", "Make patterns visible", "Place events in sequence without claiming causation.", left_x, y, left_w)
    y -= 42
    numbered_step(c, "03", "Prepare the conversation", "The patient chooses priorities and visit questions.", left_x, y, left_w)
    y -= 42
    numbered_step(c, "04", "Keep judgment human", "Verify sources, uncertainty, and the approved version.", left_x, y, left_w)

    section_label(c, "What I built", right_x, body_top)
    y2 = body_top - 16
    for item in [
        "Responsive six-view interactive prototype",
        "Whole-person Context Map and source ledger",
        "Health Timeline with an uncertainty boundary",
        "Patient-controlled Visit Preparation Brief",
        "Human verification gate and decision record",
        "Published method, safety, case, and review protocol",
    ]:
        y2 = bullet(c, item, right_x, y2, right_w) - 5

    divider(c, right_x, y2 - 2, right_w)
    y2 -= 24
    section_label(c, "Evidence status", right_x, y2)
    y2 -= 15
    status_row(c, "Built", "Public artifact and documentation", right_x, y2, right_w, TEAL)
    y2 -= 20
    status_row(c, "Fictional", "Persona, history, and records", right_x, y2, right_w, GOLD)
    y2 -= 20
    status_row(c, "Pending", "Need and practitioner validation", right_x, y2, right_w, HexColor("#777C76"))

    y2 -= 27
    c.setFillColor(INK_SOFT)
    c.roundRect(right_x, y2 - 86, right_w, 86, 11, stroke=0, fill=1)
    c.setFont("PhilSansBold", 6.1)
    c.setFillColor(GOLD)
    c.drawString(right_x + 15, y2 - 19, "SAFETY BOUNDARY")
    paragraph(
        c,
        "PHIL does not diagnose, prescribe, interpret results, recommend medication or supplements, assess urgency, or replace care. The public prototype collects no personal health information.",
        right_x + 15,
        y2 - 30,
        right_w - 30,
        size=7.1,
        leading=10.4,
        color=HexColor("#B7BBB5"),
    )

    footer_y = 34
    c.setFillColor(INK_SOFT)
    c.roundRect(42, footer_y, 528, 64, 13, stroke=0, fill=1)
    c.setFont("PhilSansBold", 6.2)
    c.setFillColor(GOLD)
    c.drawString(57, footer_y + 44, "BUILDER")
    c.setFont("PhilSerif", 13)
    c.setFillColor(IVORY)
    c.drawString(57, footer_y + 24, "Imani Kirika")
    c.setFont("PhilSans", 6.5)
    c.setFillColor(HexColor("#929A94"))
    c.drawString(205, footer_y + 25, "Systems builder making complexity legible and accountability visible.")

    live_url = "https://phil-health-map.imani-kirika116.chatgpt.site"
    c.setFillColor(TEAL_LIGHT)
    c.setFont("PhilSansBold", 6.8)
    c.drawRightString(554, footer_y + 42, "EXPLORE THE LIVE PROTOTYPE")
    c.setFont("PhilSans", 5.8)
    c.setFillColor(HexColor("#AAB0AA"))
    c.drawRightString(554, footer_y + 26, "phil-health-map.imani-kirika116.chatgpt.site")
    c.linkURL(live_url, (390, footer_y + 17, 558, footer_y + 51), relative=0)

    c.setFont("PhilSans", 5.5)
    c.setFillColor(MUTED)
    c.drawString(42, 16, "PROJECT BRIEF  |  AUGUST 2026  |  ALL SCENARIO DATA IS FICTIONAL")
    c.drawRightString(570, 16, "Proof over hype. No invented outcomes or endorsements.")

    c.showPage()
    c.save()


if __name__ == "__main__":
    build_pdf()
