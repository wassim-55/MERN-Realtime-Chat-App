import Avatar from '../src/Avatar';

export default function Contact({id, username, onClick, selected, online }) {
    return (
        <div
            key={id}
            onClick={() => onClick(id)}
            className={`border-b border-gray-100 flex items-center cursor-pointer ${selected ? 'bg-blue-100' : ''}`}
        >
            {selected && (
                <div className="w-1 bg-blue-500 h-12"></div>
            )}
            <div className="py-2 gap-2 flex pl-4">
                <Avatar online={online} username={username} userId={id} />
                <span className="text-gray-800">{username}</span>
            </div>
        </div>
    );
}
