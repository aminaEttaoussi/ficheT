import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, FileText, Download, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  fichestechniques,
  categoryLabels,
  Category,
  FicheTechnique,
} from "@/data/fichestechniques";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedFiche, setSelectedFiche] = useState<FicheTechnique | null>(null);

  const cat = category as Category;
  const fiches = fichestechniques.filter((f) => f.category === cat);
  const label = categoryLabels[cat] || category;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">{label}</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Accueil</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>

      {/* Grid */}
      <section className="container mx-auto px-4 py-8">
        <p className="mb-6 text-sm text-muted-foreground">
          {fiches.length} fiche{fiches.length > 1 ? "s" : ""} technique{fiches.length > 1 ? "s" : ""}
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fiches.map((fiche) => (
            <Card
              key={fiche.id}
              className="group cursor-pointer overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
              onClick={() => setSelectedFiche(fiche)}
            >
              <div className="aspect-[4/3] flex items-center justify-center p-3">
  <img
    src={fiche.imageUrl}
    alt={fiche.title}
    className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
  />
</div>
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <h3 className="text-sm font-semibold leading-tight text-foreground">
                    {fiche.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Detail Dialog */}
      <Dialog open={!!selectedFiche} onOpenChange={() => setSelectedFiche(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedFiche?.title}</DialogTitle>
          </DialogHeader>
          {selectedFiche && (
            <div className="space-y-4">
              <div className="flex h-64 items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={selectedFiche.imageUrl}
                  alt={selectedFiche.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <Button asChild className="w-full gap-2">
                <a
                  href={selectedFiche.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4" />
                  Télécharger le PDF
                </a>
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => {
                    const subject = encodeURIComponent(`Fiche technique : ${selectedFiche.title}`);
                    const pdfLink = selectedFiche.pdfUrl.startsWith("http") ? selectedFiche.pdfUrl : `${window.location.origin}${selectedFiche.pdfUrl}`;
                    const body = encodeURIComponent(`Bonjour,\n\nVoici la fiche technique "${selectedFiche.title}".\n\nLien : ${pdfLink}`);
                    window.open(`mailto:?subject=${subject}&body=${body}`);
                  }}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2 text-[hsl(142,70%,35%)]"
                  onClick={() => {
                    const pdfLink = selectedFiche.pdfUrl.startsWith("http") ? selectedFiche.pdfUrl : `${window.location.origin}${selectedFiche.pdfUrl}`;
                    const text = encodeURIComponent(`Fiche technique : ${selectedFiche.title}\n${pdfLink}`);
                    window.open(`https://wa.me/?text=${text}`, "_blank");
                  }}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryPage;
