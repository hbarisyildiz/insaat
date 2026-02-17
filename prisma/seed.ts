import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@insaat.com" },
    update: {},
    create: {
      email: "admin@insaat.com",
      name: "Admin",
      password: hashedPassword,
      role: "admin",
    },
  });

  await prisma.heroSlide.createMany({
    data: [
      {
        title: "Geleceğin Yapı Projeleriyle Tanışın",
        subtitle: "Kalite ve güvenle geleceğe inşa ediyoruz",
        buttonText: "Projelerimiz",
        buttonLink: "/projeler",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
        order: 1,
        isActive: true,
      },
      {
        title: "Sınırların Ötesinde Tasarım",
        subtitle: "Estetik, fonksiyonellik ve güvenilirlik",
        buttonText: "Hizmetlerimiz",
        buttonLink: "/hizmetler",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
        order: 2,
        isActive: true,
      },
      {
        title: "Kentsel Dönüşümde Öncü",
        subtitle: "Şehrin dokusunu koruyarak modern yapılar",
        buttonText: "Kentsel Dönüşüm",
        buttonLink: "/kentsel-donusum",
        imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
        order: 3,
        isActive: true,
      },
    ],
  });

  await prisma.project.createMany({
    data: [
      {
        title: "Marina Flats",
        slug: "marina-flats",
        description: "Kalamış'ın en prestijli lokasyonunda, deniz manzaralı lüks daireler. Modern mimari anlayışı ile tasarlanan Marina Flats, konforlu yaşam alanları sunmaktadır.",
        location: "Kalamış",
        status: "completed",
        features: "Deniz Manzarası,Kapalı Otopark,Fitness Salonu,Güvenlik",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
        images: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80,https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      },
      {
        title: "Akasya Tower",
        slug: "akasya-tower",
        description: "Göztepe'nin kalbinde yükselen Akasya Tower, modern yaşamın tüm gereksinimlerini karşılayan lüks konut projesidir.",
        location: "Göztepe",
        status: "completed",
        features: "Havuz,Çocuk Oyun Alanı,Kapalı Otopark,7/24 Güvenlik",
        imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
        images: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      },
      {
        title: "Yıldız Rezidans",
        slug: "yildiz-rezidans",
        description: "Caddebostan'da benzersiz konumuyla öne çıkan Yıldız Rezidans, yüksek kalite standartlarıyla inşa edilmiştir.",
        location: "Caddebostan",
        status: "ongoing",
        features: "Teras,Deniz Manzarası,Akıllı Ev Sistemi,SPA",
        imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
        images: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      },
      {
        title: "Villa Silivri",
        slug: "villa-silivri",
        description: "Silivri'nin doğasıyla iç içe, modern villa projesi. Geniş yaşam alanları ve özel bahçeler.",
        location: "Silivri",
        status: "ongoing",
        features: "Özel Bahçe,Havuz,Garaj,Barbekü Alanı",
        imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        images: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      },
    ],
  });

  await prisma.service.createMany({
    data: [
      {
        title: "Konut İnşaatı",
        slug: "konut-insaati",
        description: "Modern mimari anlayışıyla, depreme dayanıklı, enerji verimli konut projeleri tasarlıyor ve inşa ediyoruz. Her detayı titizlikle planlanmış yaşam alanları sunuyoruz.",
        icon: "Home",
        order: 1,
      },
      {
        title: "Kentsel Dönüşüm",
        slug: "kentsel-donusum",
        description: "Eski binaları modern, güvenli ve estetik yapılara dönüştürüyoruz. Finansman garantisi ile mal sahiplerinin riskini sıfıra indiriyoruz.",
        icon: "Building2",
        order: 2,
      },
      {
        title: "Ticari Yapılar",
        slug: "ticari-yapilar",
        description: "İş merkezleri, ofis binaları ve ticari alanlar için en yüksek standartlarda inşaat hizmeti sunuyoruz.",
        icon: "Landmark",
        order: 3,
      },
      {
        title: "Mimari Tasarım",
        slug: "mimari-tasarim",
        description: "Uzman mimar kadromuzla, fonksiyonel ve estetik tasarımlar oluşturuyoruz. Hayalinizdeki yapıyı gerçeğe dönüştürüyoruz.",
        icon: "PenTool",
        order: 4,
      },
    ],
  });

  await prisma.blogPost.createMany({
    data: [
      {
        title: "Yeni Konut Projelerinden Ev Almanın Avantajları",
        slug: "yeni-konut-projelerinden-ev-almanin-avantajlari",
        content: "Projelerden konut edinmenin birçok konuda avantajlar sunduğu bilinen bir gerçektir. Uygun fiyat seçenekleri, modern tasarımlar ve ödeme kolaylıkları bunların başında gelir. Yeni konut projeleri, son teknoloji ile inşa edilen depreme dayanıklı yapılar sunmaktadır.\n\nAyrıca, yeni projelerde enerji verimliliği ön planda tutularak, uzun vadede enerji maliyetlerinden tasarruf sağlanmaktadır. Sosyal alanlar, yeşil alanlar ve otopark gibi ortak kullanım alanları da yeni projelerin sunduğu önemli avantajlar arasındadır.",
        excerpt: "Projelerden konut edinmenin birçok konuda avantajlar sunduğu bilinen bir gerçektir.",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
        isPublished: true,
        publishedAt: new Date("2025-12-15"),
      },
      {
        title: "Kentsel Dönüşüm Nedir? Nasıl Yapılır?",
        slug: "kentsel-donusum-nedir-nasil-yapilir",
        content: "İnşaat sektörüne ilişkin en çok merak edilen konular arasında kentsel dönüşüm kavramı yer almaktadır. Kentsel dönüşüm, risk altındaki yapıların yıkılıp modern standartlara uygun olarak yeniden inşa edilmesi sürecidir.\n\nBu süreçte öncelikle binanın risk durumu değerlendirilir, ardından proje hazırlanır ve inşaat aşamasına geçilir. Kentsel dönüşüm, hem yapı güvenliğini artırır hem de şehirlerin estetik görünümüne katkıda bulunur.",
        excerpt: "İnşaat sektörüne ilişkin en çok merak edilen konular arasında kentsel dönüşüm kavramı yer almaktadır.",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
        isPublished: true,
        publishedAt: new Date("2025-11-20"),
      },
      {
        title: "İnşaat Sektöründe İş Sağlığı ve Güvenliği",
        slug: "insaat-sektorunde-is-sagligi-ve-guvenligi",
        content: "İnşaat sektörü güvenlik bakımından en fazla dikkat edilmesi gereken sektörlerin başında gelir. İş kazalarının önlenmesi için gerekli tüm tedbirlerin alınması büyük önem taşımaktadır.\n\nFirmamız, tüm projelerinde uluslararası iş güvenliği standartlarına uygun çalışmaktadır. Çalışanlarımızın güvenliği en öncelikli konumuz olup, düzenli eğitim ve denetimlerle iş güvenliği kültürünü yaşatmaktayız.",
        excerpt: "İnşaat sektörü güvenlik bakımından en fazla dikkat edilmesi gereken sektörlerin başında gelir.",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
        isPublished: true,
        publishedAt: new Date("2025-10-10"),
      },
    ],
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: "Ahmet Yılmaz",
        title: "Ev Sahibi",
        content: "Marina Flats projesinde ikamet ediyorum. Kaliteli işçilik ve zamanında teslim. Çok memnunuz.",
        isActive: true,
      },
      {
        name: "Ayşe Kara",
        title: "Müşteri",
        content: "Kentsel dönüşüm sürecinde firmaya güvenimiz tamdı ve haklı çıktık. Her şey söylendiği gibi oldu.",
        isActive: true,
      },
      {
        name: "Mehmet Demir",
        title: "Yatırımcı",
        content: "Profesyonel yaklaşım ve şeffaf iletişim. Yatırım açısından çok doğru bir tercih yaptım.",
        isActive: true,
      },
    ],
  });

  await prisma.fAQ.createMany({
    data: [
      {
        question: "Kentsel dönüşüm süreci nasıl işliyor?",
        answer: "Kentsel dönüşüm süreci, binanın risk raporunun alınması ile başlar. Ardından 2/3 çoğunluk kararı ile yıkım ve yeniden inşa süreci başlatılır. Firmamız bu sürecin her aşamasında yanınızda olur.",
        category: "kentsel-donusum",
        order: 1,
      },
      {
        question: "Projelerinizde finansman desteği var mı?",
        answer: "Evet, işbirliği yaptığımız bankalar aracılığıyla uygun koşullarda konut kredisi imkanı sunuyoruz. Ayrıca kentsel dönüşüm projelerinde mal sahiplerine özel finansman paketleri mevcuttur.",
        category: "finansman",
        order: 2,
      },
      {
        question: "Teslim süreleri ne kadar?",
        answer: "Proje büyüklüğüne göre değişmekle birlikte, ortalama teslim süremiz 18-24 aydır. Tüm projelerimizi sözleşmede belirtilen sürede teslim etmeyi garanti ediyoruz.",
        category: "genel",
        order: 3,
      },
      {
        question: "Satış sonrası destek sunuyor musunuz?",
        answer: "Evet, tüm projelerimizde 5 yıl satış sonrası destek sunuyoruz. Üretimle ilgili ortaya çıkabilecek sorunlara anında müdahale ediyoruz.",
        category: "genel",
        order: 4,
      },
    ],
  });

  await prisma.siteSetting.createMany({
    data: [
      { key: "site_name", value: "İnşaat Yapı" },
      { key: "site_description", value: "Kalite ve güvenle geleceğe inşa ediyoruz" },
      { key: "phone", value: "(0212) 555 00 00" },
      { key: "email", value: "bilgi@insaatyapi.com.tr" },
      { key: "address", value: "Atatürk Cad. No: 123, Bahçelievler / İstanbul" },
      { key: "whatsapp", value: "905551234567" },
      { key: "instagram", value: "https://instagram.com/insaatyapi" },
      { key: "facebook", value: "https://facebook.com/insaatyapi" },
      { key: "twitter", value: "https://twitter.com/insaatyapi" },
      { key: "youtube", value: "https://youtube.com/insaatyapi" },
      { key: "linkedin", value: "https://linkedin.com/company/insaatyapi" },
      { key: "experience_years", value: "30" },
      { key: "completed_projects", value: "150" },
      { key: "happy_customers", value: "500" },
    ],
  });

  await prisma.page.createMany({
    data: [
      {
        slug: "hakkimizda",
        title: "Hakkımızda",
        content: JSON.stringify({
          story: "1993 yılında kurulan firmamız, Türk inşaat sektörünün önde gelen firmalarından biri olarak, yıllar içinde kazandığı deneyim ve uzmanlık ile bugün İstanbul ve çevresindeki binaların dönüşümünde lider konumda bulunmaktadır.",
          vision: "Sürdürülebilir, estetik ve güvenli yapılar inşa ederek şehirlerin geleceğine katkıda bulunmak.",
          mission: "Müşterilerimize en yüksek kalitede inşaat hizmeti sunarak, güvenli ve konforlu yaşam alanları oluşturmak.",
          values: "Güvenilirlik, Kalite, Yenilikçilik, Müşteri Memnuniyeti",
        }),
      },
      {
        slug: "kentsel-donusum",
        title: "Kentsel Dönüşüm",
        content: JSON.stringify({
          intro: "Kentsel dönüşüm, risk altındaki yapıların yıkılıp modern standartlara uygun olarak yeniden inşa edilmesi sürecidir. Firmamız bu süreçte mal sahiplerine tam güvence sunmaktadır.",
          steps: [
            "Risk Raporu Alınması",
            "2/3 Çoğunluk Kararı",
            "Proje Tasarımı",
            "Finansman Planlaması",
            "Yıkım ve İnşaat",
            "Teslim ve Taşınma",
          ],
          guarantee: "Tüm projelerimizi, işbirliği yaptığımız bankaların finansman garantisi altına alarak, mal sahiplerinin riskini sıfıra indiriyoruz.",
        }),
      },
    ],
  });

  await prisma.teamMember.createMany({
    data: [
      {
        name: "Ali Yılmaz",
        title: "Genel Müdür",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
        order: 1,
      },
      {
        name: "Zeynep Kaya",
        title: "Mimar",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        order: 2,
      },
      {
        name: "Burak Çelik",
        title: "İnşaat Mühendisi",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        order: 3,
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
