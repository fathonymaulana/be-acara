import mongoose from "mongoose";
import UserModel from "./models/user.model";
import CategoryModel from "./models/category.model";
import BannerModel from "./models/banner.model";
import EventModel from "./models/event.model";
import TicketModel from "./models/ticket.model";
import OrderModel, { OrderStatus } from "./models/order.model";
import { DATABASE_URL } from "./utils/env";

const seedDummyData = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: "db-acara",
    });
    console.log("Connected to database...");

    const admin = await UserModel.findOne({ username: "admin" });
    if (!admin) {
      console.log("Admin account not found. Please run seed.ts first.");
      process.exit(1);
    }

    // Clean old data
    await CategoryModel.deleteMany({});
    await BannerModel.deleteMany({});
    await EventModel.deleteMany({});
    await TicketModel.deleteMany({});
    await OrderModel.deleteMany({});
    console.log("Cleared old dummy data...");

    const categoriesData = [
      {
        name: "Exhibition",
        description: "Pameran karya dan produk anak bangsa",
        icon: "/images/category/icon-exhibition.jpg",
      },
      {
        name: "Festival",
        description: "Festival musik, seni, dan budaya meriah",
        icon: "/images/category/icon-festival.jpg",
      },
      {
        name: "Konser",
        description: "Konser musik spektakuler artis favorit",
        icon: "/images/category/icon-konser.jpg",
      },
      {
        name: "Konferensi",
        description: "Konferensi, rapat, dan pertemuan bisnis",
        icon: "/images/category/icon-konverensi.jpg",
      },
      {
        name: "Pertandingan",
        description: "Pertandingan liga olahraga nasional",
        icon: "/images/category/icon-pertandingan.jpg",
      },
      {
        name: "Pertunjukan",
        description: "Pertunjukan panggung teater eksklusif",
        icon: "/images/category/icon-pertunjukan.jpg",
      },
      {
        name: "Seminar",
        description: "Seminar edukatif dan berbagi ilmu",
        icon: "/images/category/icon-seminar.jpg",
      },
      {
        name: "Workshop",
        description: "Workshop interaktif tingkatkan wawasan",
        icon: "/images/category/icon-workshop.jpg",
      },
    ];

    const insertedCategories = await CategoryModel.insertMany(categoriesData);
    console.log(`Inserted ${insertedCategories.length} categories.`);

    const bannersData = [
      {
        title: "Special Year End Promo",
        image: "/images/banner/gmdqqntfl2lsc0ivzr2k.webp",
        isShow: true,
      },
      {
        title: "Exclusive Festival Ticket",
        image: "/images/banner/yymuih2fo8o5whame8cs.webp",
        isShow: true,
      },
    ];

    await BannerModel.insertMany(bannersData);
    console.log("Inserted 2 banners.");

    const eventImages = [
      "/images/event/d4d5b5cd6ohsd4h3o4pf.webp",
      "/images/event/ixzmoc9nh5yq3uuehbi1.webp",
      "/images/event/j6hxg7fpngy1jcbqd15y.webp",
      "/images/event/qh3wxp26yz8vd0bawgbw.webp",
      "/images/event/vrxvcxnwdmfb2xmdtxmq.webp",
    ];

    const eventNames = [
      "Tech Startup Conference 2026",
      "Summer Music Festival XYZ",
      "Art & Design Exhibition",
      "Grand E-Sports Tournament",
      "Business Strategy Workshop",
    ];

    const insertedEvents = [];
    for (let i = 0; i < eventImages.length; i++) {
      const ev = new EventModel({
        name: eventNames[i],
        startDate: new Date(Date.now() + i * 2 * 86400000).toISOString(),
        endDate: new Date(Date.now() + (i * 2 + 1) * 86400000).toISOString(),
        description: `Bergabunglah dalam ${eventNames[i]} untuk pengalaman yang tidak terlupakan. Temui para expert dan perluas networking Anda. Dapatkan tiket sekarang sebelum kehabisan!`,
        banner: eventImages[i],
        isFeatured: true,
        isOnline: false,
        isPublish: true,
        category: insertedCategories[i % insertedCategories.length]._id,
        createdBy: admin._id,
        location: {
          region: 1,
          coordinates: [0, 0],
          address: "Jalan Sudirman, Jakarta Selatan",
        },
      });
      await ev.save();
      insertedEvents.push(ev);
    }
    console.log(`Inserted ${insertedEvents.length} events.`);

    const insertedTickets = [];
    for (let i = 0; i < insertedEvents.length; i++) {
      const ticket = new TicketModel({
        price: 250000 + i * 50000,
        name: `VIP Ticket - ${eventNames[i]}`,
        events: insertedEvents[i]._id,
        description: "Akses premium dengan tempat duduk eksklusif",
        quantity: 50,
      });
      await ticket.save();
      insertedTickets.push(ticket);
    }
    console.log(`Inserted ${insertedTickets.length} tickets.`);

    for (let i = 0; i < 3; i++) {
      await OrderModel.collection.insertOne({
        orderId: `TRX-${Date.now()}-${i}`,
        createdBy: admin._id,
        events: insertedEvents[i]._id,
        total: insertedTickets[i].price,
        payment: {
          token: "dummy-token-" + i,
          redirect_url: "http://dummy-payment-provider.com",
        },
        status: OrderStatus.COMPLETED,
        ticket: insertedTickets[i]._id,
        quantity: i + 1,
        vouchers: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    console.log(`Inserted 3 dummy transactions.`);

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDummyData();
