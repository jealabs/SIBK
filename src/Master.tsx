"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  Users,
  X,
} from "lucide-react";

type AcademicYear = {
  id: string;
  name: string;
  active: boolean;
  created: string;
};
type ClassItem = {
  id: string;
  name: string;
  teacher: string;
  year: string;
  created: string;
  initials: string;
  color: string;
};

const initialYears: AcademicYear[] = [
  { id: "1", name: "2024 / 2025", active: true, created: "12 Jul 2024" },
  { id: "2", name: "2023 / 2024", active: false, created: "10 Jul 2023" },
  { id: "3", name: "2022 / 2023", active: false, created: "08 Jul 2022" },
];

const classes: ClassItem[] = [
  {
    id: "1",
    name: "VII A",
    teacher: "Budi Santoso",
    year: "2024 / 2025",
    created: "14 Jul 2024",
    initials: "BS",
    color: "bg-[#d8eee9]",
  },
  {
    id: "2",
    name: "VII B",
    teacher: "Siti Aminah",
    year: "2024 / 2025",
    created: "14 Jul 2024",
    initials: "SA",
    color: "bg-[#f8e5c8]",
  },
  {
    id: "3",
    name: "VIII A",
    teacher: "Rina Wulandari",
    year: "2024 / 2025",
    created: "15 Jul 2024",
    initials: "RW",
    color: "bg-[#e3def5]",
  },
  {
    id: "4",
    name: "VIII B",
    teacher: "Agus Pranoto",
    year: "2024 / 2025",
    created: "15 Jul 2024",
    initials: "AP",
    color: "bg-[#dce9f8]",
  },
  {
    id: "5",
    name: "IX A",
    teacher: "Dewi Lestari",
    year: "2024 / 2025",
    created: "16 Jul 2024",
    initials: "DL",
    color: "bg-[#f4d9dd]",
  },
  {
    id: "6",
    name: "IX B",
    teacher: "Hendra Wijaya",
    year: "2024 / 2025",
    created: "16 Jul 2024",
    initials: "HW",
    color: "bg-[#d7eddf]",
  },
];

export default function Page() {
  const [view, setView] = useState<"overview" | "years" | "classes">(
    "overview",
  );
  const [years, setYears] = useState(initialYears);
  const [yearFilter, setYearFilter] = useState("2024 / 2025");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<AcademicYear | null>(null);
  const [yearName, setYearName] = useState("");
  const [notice, setNotice] = useState("");

  const filteredClasses = useMemo(
    () => classes.filter((item) => item.year === yearFilter),
    [yearFilter],
  );
  const activeYear = years.find((year) => year.active)?.name ?? "2024 / 2025";

  function openYearForm(year?: AcademicYear) {
    setEditing(year ?? null);
    setYearName(year?.name ?? "");
    setModal(true);
  }

  function saveYear() {
    if (!yearName.trim()) return;
    if (editing) {
      setYears((current) =>
        current.map((year) =>
          year.id === editing.id ? { ...year, name: yearName.trim() } : year,
        ),
      );
      setNotice("Tahun ajaran berhasil diperbarui");
    } else {
      setYears((current) => [
        {
          id: String(Date.now()),
          name: yearName.trim(),
          active: false,
          created: "22 Oct 2026",
        },
        ...current,
      ]);
      setNotice("Tahun ajaran berhasil ditambahkan");
    }
    setModal(false);
    setTimeout(() => setNotice(""), 2500);
  }

  function toggleActive(id: string) {
    setYears((current) =>
      current.map((year) => ({ ...year, active: year.id === id })),
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f9fb] text-[#24343b]">
      <div className="flex min-h-screen">
        <aside className="hidden w-63 shrink-0 border-r border-[#e4e9ed] bg-white px-5 py-7 lg:flex lg:flex-col">
          <div className="flex items-center gap-3 px-2">
            <div className="flex size-10 cursor-pointer items-center justify-center rounded-xl bg-[#0e346b] text-white shadow-sm">
              <GraduationCap />
            </div>
            <div>
              <p className="text-[17px] font-bold tracking-tight text-[#173c3a]">
                SIBK
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#9aabad]">
                Admin Portal
              </p>
            </div>
          </div>
          <div className="mt-12 flex flex-1 flex-col gap-8">
            <NavGroup label="MENU">
              <NavItem
                icon={<LayoutDashboard />}
                label="Ringkasan"
                active={view === "overview"}
                onClick={() => setView("overview")}
              />
              <NavItem
                icon={<CalendarDays />}
                label="Tahun Ajaran"
                active={view === "years"}
                onClick={() => setView("years")}
              />
              <NavItem
                icon={<Users />}
                label="Kelas"
                active={view === "classes"}
                onClick={() => setView("classes")}
              />
            </NavGroup>
            <NavGroup label="PENGATURAN">
              <NavItem icon={<Settings />} label="Pengaturan" />
            </NavGroup>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex h-19 items-center justify-between border-b border-[#e4e9ed] bg-white px-6 md:px-10">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#0e346b] text-white">
                <GraduationCap />
              </div>
              <b>SIBK</b>
            </div>
            <div className="relative hidden w-65 md:block">
              <Search
                className="absolute left-3 top-2.5 text-[#9ba9ad] cursor-pointer"
                size={17}
              />
              <input
                aria-label="Cari"
                placeholder="Cari sesuatu..."
                className="h-9 w-full rounded-lg bg-[#f7f9fb] pl-10 pr-3 text-xs outline-none placeholder:text-[#a9b3b6]"
              />
            </div>
            <div className="flex items-center gap-5">
              <button
                aria-label="Notifikasi"
                className="cursor-pointer relative text-[#718084]"
              >
                <Bell size={19} />
                <span className="absolute -right-1 -top-1 size-2 rounded-full bg-[#e97762] ring-2 ring-white" />
              </button>
              <div className="h-7 w-px bg-[#e5eaed]" />
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#e4ebf5] text-xs font-bold text-[#0e346b] cursor-pointer">
                  AD
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-semibold">Admin SIBK</p>
                  <p className="text-[10px] text-[#95a2a6]">Administrator</p>
                </div>
                <ChevronDown
                  size={15}
                  className="text-[#95a2a6] cursor-pointer"
                />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-360 px-6 py-8 md:px-10 md:py-10">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-2 text-xs font-medium text-[#9aa7aa]">
                  Dashboard /{" "}
                  {view === "overview"
                    ? "Ringkasan"
                    : view === "years"
                      ? "Tahun Ajaran"
                      : "Kelas"}
                </p>
                <h1 className="text-[28px] font-bold tracking-[-0.04em] text-[#1c3438]">
                  {view === "overview"
                    ? "Selamat datang, Admin"
                    : view === "years"
                      ? "Tahun Ajaran"
                      : "Kelas"}
                </h1>
                <p className="mt-1 text-sm text-[#829095]">
                  Kelola data akademik sekolah dengan mudah.
                </p>
              </div>
              {view !== "classes" && (
                <button
                  onClick={() => openYearForm()}
                  className="flex cursor-pointer h-10 items-center justify-center gap-2 rounded-lg bg-[#0e346b] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0d285a]"
                >
                  <Plus size={16} /> Tambah Tahun Ajaran
                </button>
              )}
            </div>

            {view === "overview" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <Stat
                    icon={<CalendarDays />}
                    label="Tahun Ajaran Aktif"
                    value={activeYear}
                    tone="green"
                  />
                  <Stat
                    icon={<Users />}
                    label="Total Kelas"
                    value="12 Kelas"
                    tone="blue"
                  />
                  <Stat
                    icon={<GraduationCap />}
                    label="Total Siswa"
                    value="348 Siswa"
                    tone="purple"
                  />
                  <Stat
                    icon={<BookOpen />}
                    label="Mata Pelajaran"
                    value="24 Mapel"
                    tone="orange"
                  />
                </div>
                <div className="mt-7 flex flex-col gap-6">
                  <Card
                    title="Tahun Ajaran"
                    action="Lihat semua"
                    onAction={() => setView("years")}
                  >
                    <YearTable
                      years={years.slice(0, 3)}
                      onToggle={toggleActive}
                      onEdit={openYearForm}
                      compact
                    />
                  </Card>
                  <Card
                    title="Kelas Terbaru"
                    action="Lihat semua"
                    onAction={() => setView("classes")}
                  >
                    <ClassTable
                      classes={filteredClasses.slice(0, 4)}
                      onEdit={() => {}}
                      compact
                    />
                  </Card>
                </div>
              </>
            )}
            {view === "years" && (
              <Card
                title="Daftar tahun ajaran"
                description="Atur periode akademik yang sedang berjalan."
              >
                <YearTable
                  years={years}
                  onToggle={toggleActive}
                  onEdit={openYearForm}
                />
              </Card>
            )}
            {view === "classes" && (
              <Card
                title="Daftar kelas"
                description="Kelola kelas berdasarkan tahun ajaran."
                action={
                  <select
                    value={yearFilter}
                    onChange={(event) => setYearFilter(event.target.value)}
                    className="h-9 rounded-lg border border-[#dce4e6] bg-white px-3 text-xs font-medium text-[#43565b] outline-none"
                  >
                    <option>2024 / 2025</option>
                    <option>2023 / 2024</option>
                  </select>
                }
              >
                <ClassTable classes={filteredClasses} onEdit={() => {}} />
              </Card>
            )}
          </div>
        </section>
      </div>
      {notice && (
        <div className="fixed bottom-6 right-6 rounded-lg bg-[#0e346b] px-4 py-3 text-xs font-medium text-white shadow-lg">
          {notice}
        </div>
      )}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0e346b]/25 px-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="year-modal-title"
        >
          <div className="w-full max-w-110 rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2
                  id="year-modal-title"
                  className="text-lg font-bold text-[#203c40]"
                >
                  {editing ? "Edit tahun ajaran" : "Tambah tahun ajaran"}
                </h2>
                <p className="mt-1 text-xs text-[#8a999d]">
                  Lengkapi informasi tahun ajaran di bawah ini.
                </p>
              </div>
              <button
                aria-label="Tutup"
                onClick={() => setModal(false)}
                className="text-[#9aa8ab] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <label
              htmlFor="year-name"
              className="mt-6 block text-xs font-semibold text-[#52656a]"
            >
              Nama tahun ajaran
            </label>
            <input
              id="year-name"
              autoFocus
              value={yearName}
              onChange={(event) => setYearName(event.target.value)}
              placeholder="Contoh: 2025 / 2026"
              className="mt-2 h-11 w-full rounded-lg border border-[#dce5e7] px-3 text-sm outline-none ring-[#9cc5fe] focus:ring-2"
            />
            <div className="mt-7 flex justify-end gap-2">
              <button
                onClick={() => setModal(false)}
                className="h-10 rounded-lg px-4 text-xs font-semibold text-[#718084] hover:bg-[#f5f7f8]"
              >
                Batal
              </button>
              <button
                onClick={saveYear}
                className="h-10 rounded-lg bg-[#0e346b] px-5 text-xs font-semibold text-white hover:bg-[#0b2952] cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function NavGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.14em] text-[#a4afb1]">
        {label}
      </p>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition ${active ? "bg-[#e8eef7] text-[#0e346b]" : "text-[#728186] hover:bg-[#f5f8f8]"}`}
    >
      {icon}
      <span>{label}</span>
      {active && (
        <span className="ml-auto size-1.5 rounded-full bg-[#0e346b]" />
      )}
    </button>
  );
}
function Stat({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-[#e7ecee] bg-white p-5">
      <div
        className={`mb-5 flex size-9 items-center justify-center rounded-lg ${tone === "green" ? "bg-[#e6edf8] text-[#0e346b]" : tone === "blue" ? "bg-[#e8f1fb] text-[#3b76b8]" : tone === "purple" ? "bg-[#eeeafb] text-[#7664b5]" : "bg-[#fdf0de] text-[#c48635]"}`}
      >
        {icon}
      </div>
      <p className="text-xs text-[#879599]">{label}</p>
      <p className="mt-1 text-lg font-bold text-[#294045]">{value}</p>
    </div>
  );
}
function Card({
  title,
  description,
  action,
  onAction,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode | string;
  onAction?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#e7ecee] bg-white">
      <div className="flex flex-col gap-3 border-b border-[#edf0f2] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#294045]">{title}</h2>
          {description && (
            <p className="mt-1 text-xs text-[#95a2a6]">{description}</p>
          )}
        </div>
        {typeof action === "string" ? (
          <button
            onClick={onAction}
            className="cursor-pointer text-xs font-semibold text-[#0e346b]"
          >
            {action} →
          </button>
        ) : (
          action
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
function YearTable({
  years,
  onToggle,
  onEdit,
  compact,
}: {
  years: AcademicYear[];
  onToggle: (id: string) => void;
  onEdit: (year: AcademicYear) => void;
  compact?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-150 h-auto text-left">
        <thead>
          <tr className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#a0abad]">
            <th className="pb-3 pl-2">No.</th>
            <th className="pb-3">Nama tahun ajaran</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Dibuat pada</th>
            <th className="pb-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {years.map((year, index) => (
            <tr
              key={year.id}
              className="border-t border-[#edf0f2] text-[#52656a]"
            >
              <td className="py-4 pl-2 text-[#a1acae]">
                {String(index + 1).padStart(2, "0")}
              </td>
              <td className="py-4 font-semibold text-[#365055]">{year.name}</td>
              <td className="flex items-center py-4 text-center">
                <button
                  onClick={() => onToggle(year.id)}
                  role="switch"
                  aria-checked={year.active}
                  aria-label={`Aktifkan ${year.name}`}
                  className={`relative cursor-pointer h-5 w-9 rounded-full transition ${year.active ? "bg-[#0e346b]" : "bg-[#dbe3e5]"}`}
                >
                  <span
                    className={`absolute top-1 size-3 rounded-full bg-white shadow-sm transition ${year.active ? "left-5" : "left-1"}`}
                  />
                </button>
                <span
                  className={`ml-2 cursor-pointer rounded-full px-2 py-1 text-[10px] font-semibold ${year.active ? "bg-[#e6edf8] text-[#0e346b]" : "bg-[#f2f4f5] text-[#8b999c]"}`}
                >
                  {year.active ? "Aktif" : "Tidak aktif"}
                </span>
              </td>
              <td className="py-4 text-[#89979a]">{year.created}</td>
              <td className="py-4 text-right">
                <button
                  onClick={() => onEdit(year)}
                  aria-label={`Edit ${year.name}`}
                  className="rounded-md cursor-pointer p-1.5 text-[#859497] hover:bg-[#edf2f8] hover:text-[#0e346b]"
                >
                  <Pencil size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {compact && (
        <p className="mt-3 text-[11px] text-[#a0abad]">
          Menampilkan {years.length} tahun ajaran terbaru
        </p>
      )}
    </div>
  );
}

function ClassTable({
  classes,
  onEdit,
  compact,
}: {
  classes: ClassItem[];
  onEdit: (item: ClassItem) => void;
  compact?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-150 text-left">
        <thead>
          <tr className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#a0abad]">
            <th className="pb-3 pl-2">No.</th>
            <th className="pb-3">Nama kelas</th>
            <th className="pb-3">Wali kelas</th>
            <th className="pb-3">Dibuat pada</th>
            <th className="pb-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {classes.map((item, index) => (
            <tr key={item.id} className="border-t border-[#edf0f2]">
              <td className="py-4 pl-2 text-[#a1acae]">
                {String(index + 1).padStart(2, "0")}
              </td>
              <td className="py-4 font-semibold text-[#365055]">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex size-8 items-center justify-center rounded-lg ${item.color} text-[10px] font-bold text-[#355354]`}
                  >
                    {item.initials}
                  </div>
                  <span>Kelas {item.name}</span>
                </div>
              </td>
              <td className="py-4 text-[#52656a]">{item.teacher}</td>
              <td className="py-4 text-[#89979a]">{item.created}</td>
              <td className="py-4 text-right">
                <button
                  onClick={() => onEdit(item)}
                  aria-label={`Edit ${item.name}`}
                  className="hover:text-blue-500 cursor-pointer rounded-md p-1.5 text-[#859497] hover:bg-[#edf2f8]"
                >
                  <Pencil size={15} />
                </button>
                <button
                  aria-label={`Menu ${item.name}`}
                  className="hover:text-red-500 cursor-pointer rounded-md p-1.5 text-[#859497] hover:bg-[#f4f6f7]"
                >
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {compact && (
        <p className="mt-3 text-[11px] text-[#a0abad]">
          Menampilkan {classes.length} kelas terbaru
        </p>
      )}
    </div>
  );
}
