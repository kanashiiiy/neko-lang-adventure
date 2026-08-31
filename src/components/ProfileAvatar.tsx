interface ProfileAvatarProps {
  name?: string | null;
  url?: string | null;
  size?: number;
  className?: string;
}

/** Avatar do usuário: mostra a foto salva ou a inicial do nome. */
export function ProfileAvatar({ name, url, size = 96, className = "" }: ProfileAvatarProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full bg-white/20 font-black backdrop-blur ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {url ? (
        <img src={url} alt={name ?? "Avatar"} className="h-full w-full object-cover" />
      ) : (
        <span>{name?.[0]?.toUpperCase() ?? "?"}</span>
      )}
    </div>
  );
}

/** Reduz e comprime a imagem escolhida para salvar no perfil. */
export function fileToAvatarDataUrl(file: File, max = 256): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read-error"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode-error"));
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = max;
        canvas.height = max;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("canvas-error"));
        ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, max, max);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
