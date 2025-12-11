import { NextRequest, NextResponse } from 'next/server';
import { locales } from '../i18n';

const defaultLocale = 'vi';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Bỏ qua các file tĩnh và API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Lấy locale từ cookie (đã lưu từ client-side)
  const savedLocale = request.cookies.get('POWERCARD_LOCALE')?.value;
  
  // Validate locale từ cookie, nếu không hợp lệ thì dùng default
  const preferredLocale = 
    savedLocale && locales.includes(savedLocale as any) 
      ? savedLocale 
      : defaultLocale;

  // Kiểm tra xem pathname có locale không
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Lấy locale hiện tại từ URL (nếu có)
  let currentLocale: string | null = null;
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      currentLocale = locale;
      break;
    }
  }

  // Case 1: URL không có locale -> redirect về preferredLocale
  if (!pathnameHasLocale) {
    const newPathname = pathname === '/' 
      ? `/${preferredLocale}` 
      : `/${preferredLocale}${pathname}`;
    
    const url = request.nextUrl.clone();
    url.pathname = newPathname;
    
    const response = NextResponse.redirect(url);
    // Lưu locale vào cookie
    response.cookies.set('POWERCARD_LOCALE', preferredLocale, {
      maxAge: 365 * 24 * 60 * 60, // 1 năm
      path: '/',
    });
    
    return response;
  }

  // Case 2: URL có locale hợp lệ
  if (currentLocale) {
    const response = NextResponse.next();

    if (currentLocale !== savedLocale) {
      response.cookies.set('POWERCARD_LOCALE', currentLocale, {
        maxAge: 365 * 24 * 60 * 60,
        path: '/',
      });
    }
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};
