export function ChatInput() {
  return (
    <>
      <form>
        <div className="px-3 py-2 border-2 min-h-10 w-[800px] rounded-3xl shadow-sm flex flex-col">
          <section className="flex flex-col justify-start" style={{minHeight: 0}}>
            <div className="flex min-h-[44px] items-start pl-1">
              <div className="min-w-0 max-w-full flex-1">
                <div className="max-h-52 overflow-auto py-2">
                <textarea
                  className="block h-10 w-full resize-none border-0 bg-transparent px-0 py-2 focus-visible:outline-none"
                  autoFocus placeholder="Poser une question" data-virtualkeyboard="true"
                  style={{display: "none"}}>
                </textarea>
                  <div
                    contentEditable="true" translate="no" id="prompt-textarea" autoFocus
                    data-virtualkeyboard="true" spellCheck="false" className="focus-visible:outline-none"
                    data-placeholder="Poser une question"
                  >
                    <p data-placeholder="Poser une question"
                       className="text-muted-foreground">

                      <br className="ProseMirror-trailingBreak"/>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </form>

    </>
  )
}