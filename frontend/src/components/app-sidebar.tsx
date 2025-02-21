import { Home, ScanBarcode, CircleDollarSign } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Clientes",
    url: "/",
    icon: Home,
  },
  {
    title: "Vendas",
    url: "/sale",
    icon: CircleDollarSign,
  },
  {
    title: "Produtos",
    url: "/product",
    icon: ScanBarcode,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-blue-500" collapsible="icon">
      <SidebarContent className="bg-[#1D1616] text-secondary">
        <SidebarGroup>
          <SidebarGroupLabel className="text-4xl my-8 text-secondary cursor-pointer">
            <Image src="/creditall.png" alt="Logo" width={200} height={50} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
