import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { fichestechniques, categoryLabels, categoryDescriptions, Category } from "@/data/fichestechniques";
import { Forklift, ShieldCheck, HardHat } from "lucide-react";

const categoryConfig: Record<Category, { icon: React.ReactNode; color: string }> = {
  manutention: {
    icon: <Forklift className="h-12 w-12" />,
    color: "bg-[hsl(var(--manutention))]",
  },
  protection: {
    icon: <ShieldCheck className="h-12 w-12" />,
    color: "bg-[hsl(var(--protection))]",
  },
  epi: {
    icon: <HardHat className="h-12 w-12" />,
    color: "bg-[hsl(var(--epi))]",
  },
};

const Index = () => {
  const categories: Category[] = ["manutention", "protection", "epi"];

  const getCount = (cat: Category) =>
    fichestechniques.filter((f) => f.category === cat).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center gap-3 px-4 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Fiches Techniques
            </h1>
            <p className="text-xs text-muted-foreground">
              Gestion & consultation
            </p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary px-4 py-16 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Vos fiches techniques,<br />toujours à portée de main
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-primary-foreground/80">
          Consultez rapidement les fiches techniques classées par catégorie.
        </p>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="mb-8 text-center text-lg font-semibold text-muted-foreground uppercase tracking-widest">
          Choisissez une catégorie
        </h3>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {categories.map((cat) => {
            const config = categoryConfig[cat];
            const count = getCount(cat);
            return (
              <Link key={cat} to={`/categorie/${cat}`}>
                <Card className="group relative overflow-hidden border-0 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className={`${config.color} px-6 py-8 text-center text-white`}>
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                      {config.icon}
                    </div>
                    <h4 className="text-xl font-bold">{categoryLabels[cat]}</h4>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-sm text-muted-foreground">
                      {categoryDescriptions[cat]}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {count} fiche{count > 1 ? "s" : ""}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Index;
