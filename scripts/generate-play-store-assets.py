#!/usr/bin/env python3
"""Generate Play Store / app icons from bundled animal illustrations.

Uses assets/animals/illustrations/ (Fluent Emoji MIT — commercial OK).

Outputs:
  assets/icon.png, splash, adaptive icons, favicon
  play-store/graphics/* , play-store/screenshots/phone/*
"""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ILLUSTRATIONS = ROOT / "assets" / "animals" / "illustrations"
OUT_ASSETS = ROOT / "assets"
OUT_PLAY = ROOT / "play-store"
OUT_GFX = OUT_PLAY / "graphics"
OUT_SHOTS = OUT_PLAY / "screenshots" / "phone"

# Brand colors (match src/constants/theme.ts)
BG_TOP = (223, 243, 240)
BG_MID = (234, 246, 255)
BG_BOTTOM = (255, 246, 232)
INK = (27, 43, 51)
INK_MUTED = (91, 111, 120)
ACCENT = (31, 138, 122)
SUNNY = (255, 200, 87)
CREAM = (255, 251, 245)
WHITE = (255, 255, 255)
BOSS = (232, 116, 79)
EMP = (42, 155, 181)
LINE = (201, 228, 222)


def load_animal(name: str, size: int) -> Image.Image:
    path = ILLUSTRATIONS / f"{name}.png"
    img = Image.open(path).convert("RGBA")
    img = img.resize((size, size), Image.Resampling.LANCZOS)
    return img


def gradient(size: tuple[int, int], top, mid, bottom) -> Image.Image:
    w, h = size
    img = Image.new("RGB", size)
    px = img.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        if t < 0.5:
            u = t * 2
            c = tuple(int(top[i] + (mid[i] - top[i]) * u) for i in range(3))
        else:
            u = (t - 0.5) * 2
            c = tuple(int(mid[i] + (bottom[i] - mid[i]) * u) for i in range(3))
        for x in range(w):
            px[x, y] = c
    return img


def font(size: int, bold: bool = False):
    candidates = [
        "/System/Library/Fonts/AppleSDGothicNeo.ttc",
        "/System/Library/Fonts/Supplemental/AppleGothic.ttf",
        "/Library/Fonts/Arial Unicode.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in candidates:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size, index=0)
            except OSError:
                try:
                    return ImageFont.truetype(path, size)
                except OSError:
                    continue
    return ImageFont.load_default()


def rounded_rect(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def paste_center(base: Image.Image, overlay: Image.Image, cy: int | None = None):
    x = (base.width - overlay.width) // 2
    y = (base.height - overlay.height) // 2 if cy is None else cy - overlay.height // 2
    base.paste(overlay, (x, y), overlay)


def make_app_icon() -> Image.Image:
    """1024 icon: pastel circle + lion + bee (boss/employee)."""
    size = 1024
    img = gradient((size, size), BG_TOP, BG_MID, BG_BOTTOM).convert("RGBA")
    draw = ImageDraw.Draw(img)
    # soft circle plate
    margin = 72
    draw.ellipse(
        [margin, margin, size - margin, size - margin],
        fill=(*CREAM, 255),
        outline=(*LINE, 255),
        width=8,
    )
    lion = load_animal("lion", 420)
    bee = load_animal("bee", 260)
    paste_center(img, lion, cy=460)
    # bee slightly overlapping bottom-right of lion
    img.paste(bee, (560, 560), bee)
    # small accent dots
    draw.ellipse([180, 220, 230, 270], fill=(*SUNNY, 255))
    draw.ellipse([780, 260, 820, 300], fill=(*ACCENT, 200))
    return img.convert("RGB")


def make_adaptive_fg() -> Image.Image:
    """1080 foreground — safe zone ~66% center."""
    size = 1080
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    lion = load_animal("lion", 520)
    bee = load_animal("bee", 280)
    paste_center(img, lion, cy=500)
    img.paste(bee, (600, 580), bee)
    return img


def make_adaptive_bg() -> Image.Image:
    return gradient((1080, 1080), BG_TOP, BG_MID, BG_BOTTOM)


def make_mono() -> Image.Image:
    size = 1080
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    # silhouette-ish: dark animals on transparent
    for name, s, cy, ox in (("lion", 520, 500, 0), ("bee", 260, 700, 120)):
        animal = load_animal(name, s)
        # convert to near-black alpha mask
        mono = Image.new("RGBA", animal.size, (0, 0, 0, 0))
        src = animal.load()
        dst = mono.load()
        for y in range(animal.height):
            for x in range(animal.width):
                r, g, b, a = src[x, y]
                if a > 40:
                    dst[x, y] = (0, 0, 0, a)
        x0 = (size - s) // 2 + ox
        y0 = cy - s // 2
        img.paste(mono, (x0, y0), mono)
    return img


def make_splash() -> Image.Image:
    size = 1024
    img = gradient((size, size), BG_TOP, BG_MID, BG_BOTTOM).convert("RGBA")
    lion = load_animal("lion", 380)
    paste_center(img, lion, cy=480)
    return img.convert("RGB")


def make_feature_graphic() -> Image.Image:
    """Play feature graphic 1024x500."""
    w, h = 1024, 500
    img = gradient((w, h), BG_TOP, BG_MID, BG_BOTTOM).convert("RGBA")
    draw = ImageDraw.Draw(img)
    rounded_rect(draw, (28, 28, w - 28, h - 28), 36, (*CREAM, 240), (*LINE, 255), 3)

    # Left cluster — keep clear of text column
    animals = [("lion", 180), ("owl", 140), ("bee", 130)]
    x = 56
    for name, s in animals:
        a = load_animal(name, s)
        y = (h - s) // 2 + (12 if name == "bee" else -8 if name == "owl" else 0)
        img.paste(a, (x, y), a)
        x += s - 10

    # Right text panel
    rounded_rect(draw, (520, 120, 960, 380), 28, (*WHITE, 235), (*LINE, 255), 2)
    title = font(44, True)
    sub = font(28)
    small = font(24)
    draw.text((560, 160), "오피스 동물 진단", font=title, fill=ACCENT)
    draw.text((560, 230), "부하편 & 상사편", font=sub, fill=INK)
    draw.text((560, 290), "5문항 · 소통 성향 · ___력", font=small, fill=INK_MUTED)
    return img.convert("RGB")


def make_store_icon_512() -> Image.Image:
    return make_app_icon().resize((512, 512), Image.Resampling.LANCZOS)


def phone_frame(w=1080, h=1920) -> Image.Image:
    return gradient((w, h), BG_TOP, BG_MID, BG_BOTTOM).convert("RGBA")


def shot_home() -> Image.Image:
    img = phone_frame()
    draw = ImageDraw.Draw(img)
    title = font(64)
    sub = font(36)
    body = font(30)
    draw.text((80, 160), "오피스 동물 진단", font=title, fill=ACCENT)
    draw.text((80, 250), "나는 어떤 오피스 동물일까?", font=sub, fill=INK)
    draw.text((80, 320), "5문항으로 알아보는 소통 성향과 ___력", font=body, fill=INK_MUTED)

    # role cards
    for i, (label, color, animal, emoji_y) in enumerate(
        (
            ("상사편", BOSS, "lion", 520),
            ("부하편", EMP, "bee", 520),
        )
    ):
        x0 = 80 + i * 480
        rounded_rect(draw, (x0, 480, x0 + 420, 980), 28, (*CREAM, 255), (*LINE, 255), 3)
        a = load_animal(animal, 280)
        img.paste(a, (x0 + 70, 540), a)
        draw.text((x0 + 120, 860), label, font=sub, fill=color)

    draw.text((80, 1100), "게스트로 바로 시작 · 가입 없음", font=body, fill=INK_MUTED)
    draw.text((80, 1720), "만 18세 이상 · 직장인 대상 엔터테인먼트", font=font(26), fill=INK_MUTED)
    return img.convert("RGB")


def shot_quiz() -> Image.Image:
    img = phone_frame()
    draw = ImageDraw.Draw(img)
    title = font(48)
    body = font(32)
    draw.text((80, 120), "부하편 · 2 / 5", font=font(30), fill=ACCENT)
    # progress
    draw.rounded_rectangle([80, 180, 1000, 200], radius=10, fill=LINE)
    draw.rounded_rectangle([80, 180, 480, 200], radius=10, fill=ACCENT)
    draw.text((80, 260), "급한 요청이 오면\n나는 보통…", font=title, fill=INK)

    choices = [
        ("바로 짧게 회신하고 우선순위를 잡아요", ACCENT),
        ("할 일 목록부터 정리한 뒤 답해요", EMP),
        ("동료에게 한 번 상의해요", BOSS),
        ("마감만 확인하고 차분히 처리해요", SUNNY),
    ]
    y = 520
    for text, color in choices:
        rounded_rect(draw, (80, y, 1000, y + 140), 24, (*CREAM, 255), color, 4)
        draw.text((120, y + 48), text, font=body, fill=INK)
        y += 170
    return img.convert("RGB")


def shot_result() -> Image.Image:
    img = phone_frame()
    draw = ImageDraw.Draw(img)
    draw.text((80, 100), "오늘의 결과", font=font(30), fill=INK_MUTED)
    draw.text((80, 160), "사자", font=font(64), fill=ACCENT)
    draw.text((80, 250), "결과 카드", font=font(36), fill=INK)

    rounded_rect(draw, (60, 320, 1020, 1280), 36, (*CREAM, 255), (*LINE, 255), 3)
    # art area
    art = gradient((900, 420), (255, 232, 220), BG_BOTTOM, BG_TOP).convert("RGBA")
    img.paste(art, (90, 360))
    lion = load_animal("lion", 300)
    img.paste(lion, (390, 400), lion)

    draw.text((120, 820), "🦁 사자", font=font(48), fill=ACCENT)
    draw.text((120, 900), "책임감 넘치는 사자 유형", font=font(36), fill=INK)
    draw.text((120, 980), "#책임감  #든든한리더  #워라밸존중", font=font(28), fill=ACCENT)

    # ability bars
    draw.text((120, 1080), "___력 리포트 (부하편)", font=font(30), fill=INK)
    bars = [("응답력", 0.82), ("멘탈수호력", 0.7), ("수습력", 0.75)]
    y = 1140
    for name, v in bars:
        draw.text((120, y), name, font=font(26), fill=INK_MUTED)
        draw.rounded_rectangle([360, y + 8, 920, y + 28], radius=8, fill=LINE)
        draw.rounded_rectangle([360, y + 8, 360 + int(560 * v), y + 28], radius=8, fill=ACCENT)
        y += 44

    rounded_rect(draw, (80, 1380, 500, 1500), 28, ACCENT)
    draw.text((160, 1418), "저장하기", font=font(34), fill=WHITE)
    rounded_rect(draw, (540, 1380, 1000, 1500), 28, (*CREAM, 255), ACCENT, 4)
    draw.text((640, 1418), "공유하기", font=font(34), fill=ACCENT)

    draw.text(
        (80, 1720),
        "※ 재미용 진단입니다. 의료·상담·인사평가가 아닙니다.",
        font=font(24),
        fill=INK_MUTED,
    )
    return img.convert("RGB")


def shot_share() -> Image.Image:
    img = phone_frame()
    draw = ImageDraw.Draw(img)
    draw.text((80, 140), "결과 공유", font=font(56), fill=ACCENT)
    draw.text((80, 230), "SNS로 보내거나 카드로 저장해요", font=font(32), fill=INK_MUTED)

    rounded_rect(draw, (100, 360, 980, 1100), 32, (*CREAM, 255), (*LINE, 255), 3)
    bee = load_animal("bee", 280)
    fox = load_animal("fox", 240)
    img.paste(bee, (200, 480), bee)
    img.paste(fox, (560, 500), fox)
    draw.text((200, 820), "🐝 부지런한 벌 유형", font=font(40), fill=EMP)
    draw.text((200, 900), "응답력 · 퇴근감각력 하이라이트", font=font(28), fill=INK_MUTED)

    channels = [("X", INK), ("Facebook", (66, 103, 178)), ("Instagram", BOSS), ("기타", ACCENT)]
    x = 100
    for label, color in channels:
        rounded_rect(draw, (x, 1200, x + 200, 1380), 24, (*CREAM, 255), color, 4)
        draw.text((x + 40, 1270), label, font=font(28), fill=color)
        x += 230
    return img.convert("RGB")


def save(img: Image.Image, path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)
    print(f"wrote {path.relative_to(ROOT)} ({img.size[0]}x{img.size[1]})")


def main():
    icon = make_app_icon()
    save(icon, OUT_ASSETS / "icon.png")
    save(icon.resize((48, 48), Image.Resampling.LANCZOS), OUT_ASSETS / "favicon.png")
    save(make_splash(), OUT_ASSETS / "splash-icon.png")
    save(make_adaptive_fg(), OUT_ASSETS / "android-icon-foreground.png")
    save(make_adaptive_bg(), OUT_ASSETS / "android-icon-background.png")
    save(make_mono(), OUT_ASSETS / "android-icon-monochrome.png")

    save(make_store_icon_512(), OUT_GFX / "icon-512.png")
    save(make_feature_graphic(), OUT_GFX / "feature-graphic-1024x500.png")

    shots = [
        ("01-home.png", shot_home),
        ("02-quiz.png", shot_quiz),
        ("03-result.png", shot_result),
        ("04-share.png", shot_share),
    ]
    for name, fn in shots:
        save(fn(), OUT_SHOTS / name)

    # attribution note sidecar
    (OUT_PLAY / "ATTRIBUTION.txt").write_text(
        "Play Store graphics & app icons composite OpenMoji illustrations "
        "(https://openmoji.org/) under CC BY-SA 4.0.\n"
        "Layout/branding by Hobby_App project.\n",
        encoding="utf-8",
    )
    print("done")


if __name__ == "__main__":
    main()
