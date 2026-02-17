import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-amber-500 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Sayfa Bulunamadı
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">
              <Home className="mr-2 h-4 w-4" />
              Ana Sayfa
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
