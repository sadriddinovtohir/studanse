export const WaveLoader = () => {
    return (
        <div className="flex items-end gap-1 h-10">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="w-2 rounded-full wave-bar"
                    style={{
                        animationDelay: `${i * 0.12}s`
                    }}
                />
            ))}
        </div>
    )
}