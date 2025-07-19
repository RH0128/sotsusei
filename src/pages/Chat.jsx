return (
  <div>
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
      <div className="flex items-center gap-2 px-4">
        {/* <SidebarTrigger className="-ml-1" /> 削除 */}
        {/* <Separator orientation="vertical" className="mr-2 h-4" /> 削除 */}
        <Breadcrumbs
          items={breadcrumbItems}
          onHomeClick={goToHome}
          onBreadcrumbClick={handleBreadcrumbClick}
        />
      </div>
    </header>
    <div className="flex flex-1 flex-col gap-4 pt-0">
      {/* Date Header */}
      <div className="text-center py-4">
        <h2 className="text-lg font-medium">
          {speechData[selectedIndex]?.date}
        </h2>
        <h3 className="text-md font-medium">
          {speechData[selectedIndex]?.nameOfHouse}
        </h3>
      </div>

      {/* Chat Messages */}
      <div className="space-y-6 pb-10">
        {messages.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            該当するメッセージがありませんでした
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage
              key={msg.id}
              speaker={msg.speaker}
              message={msg.message}
              showSpeaker={
                index === 0 || messages[index - 1].speaker !== msg.speaker
              }
              showAvatar={
                index === 0 || messages[index - 1].speaker !== msg.speaker
              }
              isSameSpeaker={
                index > 0 && messages[index - 1].speaker === msg.speaker
              }
              isLeftAligned={msg.isLeftAligned}
              speechOrder={msg.speechOrder}
            />
          ))
        )}
      </div>
    </div>
  </div>
);
