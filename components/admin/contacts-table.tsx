"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  MoreHorizontal,
  Search,
  Eye,
  Trash2,
  CheckCircle,
  Send,
  Loader2,
  Reply,
} from "lucide-react";
import {
  updateContactStatus,
  deleteContact as deleteContactAction,
  sendReplyToContact,
} from "@/lib/actions/contact";
import type { Contact } from "@/lib/types/contact";

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyContact, setReplyContact] = useState<Contact | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  async function handleUpdateStatus(id: string, status: Contact["status"]) {
    await updateContactStatus(id, status);
    router.refresh();
  }

  async function handleDeleteContact(id: string) {
    setIsDeleting(id);
    await deleteContactAction(id);
    router.refresh();
    setIsDeleting(null);
  }

  async function handleSendReply() {
    if (!replyContact || !replyMessage.trim()) return;

    setIsSending(true);
    const result = await sendReplyToContact(replyContact.id, replyMessage);
    setIsSending(false);

    if (result.success) {
      setReplyContact(null);
      setReplyMessage("");
      router.refresh();
    } else {
      alert(result.error || "Error al enviar respuesta");
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "pending":
        return <Badge variant="default">Nuevo</Badge>;
      case "contacted":
        return <Badge variant="secondary">Leido</Badge>;
      case "resolved":
        return <Badge className="bg-accent text-foreground">Respondido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  }

  return (
    <>
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="font-[family-name:var(--font-display)]">
              Lista de contactos
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contactos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredContacts.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Empresa
                    </TableHead>
                    <TableHead>Asunto</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Estado
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Fecha
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {contact.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {contact.company || "-"}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {contact.subject}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {getStatusBadge(contact.status)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {new Date(contact.created_at).toLocaleDateString(
                          "es-ES",
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedContact(contact);
                                if (contact.status === "pending") {
                                  handleUpdateStatus(contact.id, "contacted");
                                }
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setReplyContact(contact)}
                            >
                              <Reply className="h-4 w-4 mr-2" />
                              Responder
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(contact.id, "resolved")
                              }
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Marcar respondido
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteContact(contact.id)}
                              className="text-destructive focus:text-destructive"
                              disabled={isDeleting === contact.id}
                            >
                              {isDeleting === contact.id ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4 mr-2" />
                              )}
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">
              No se encontraron contactos
            </p>
          )}
        </CardContent>
      </Card>

      {/* Contact Detail Dialog */}
      <Dialog
        open={!!selectedContact}
        onOpenChange={() => setSelectedContact(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-display)]">
              Detalle del contacto
            </DialogTitle>
            <DialogDescription>
              Informacion completa del mensaje recibido
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nombre</p>
                  <p className="font-medium ">{selectedContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedContact.email}</p>
                </div>
                {selectedContact.company && (
                  <div>
                    <p className="text-sm text-muted-foreground">Empresa</p>
                    <p className="font-medium">{selectedContact.company}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Fecha</p>
                  <p className="font-medium">
                    {new Date(selectedContact.created_at).toLocaleString(
                      "es-ES",
                    )}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Asunto</p>
                <p className="font-medium">{selectedContact.subject}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Mensaje</p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedContact(null)}
                  className="bg-transparent"
                >
                  Cerrar
                </Button>
                <Button
                  onClick={() => {
                    setSelectedContact(null);
                    setReplyContact(selectedContact);
                  }}
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Responder
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog
        open={!!replyContact}
        onOpenChange={() => {
          setReplyContact(null);
          setReplyMessage("");
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-display)]">
              Responder a {replyContact?.name}
            </DialogTitle>
            <DialogDescription>
              El mensaje sera enviado a {replyContact?.email}
            </DialogDescription>
          </DialogHeader>
          {replyContact && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-1">
                  Mensaje original:
                </p>
                <p className="text-sm font-medium">{replyContact.subject}</p>
                <p className="text-sm mt-2 whitespace-pre-wrap">
                  {replyContact.message}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reply">Tu respuesta</Label>
                <Textarea
                  id="reply"
                  placeholder="Escribe tu respuesta..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={6}
                />
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setReplyContact(null);
                    setReplyMessage("");
                  }}
                  disabled={isSending}
                  className="bg-transparent"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSendReply}
                  disabled={isSending || !replyMessage.trim()}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar respuesta
                    </>
                  )}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
