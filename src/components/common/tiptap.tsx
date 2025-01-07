import { Button } from '@/components/ui/button'
import Bold from '@tiptap/extension-bold'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { BoldIcon, Heading2, LinkIcon } from 'lucide-react'
import { useCallback } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
}

export const Tiptap = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Heading.configure({
        levels: [2, 3],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Placeholder.configure({
        placeholder: 'هر چی راجب محصولت میدونی',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const toggleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run()
  }, [editor])

  const toggleHeading = useCallback(() => {
    editor?.chain().focus().toggleHeading({ level: 2 }).run()
  }, [editor])

  return (
    <div className="grid rounded-lg border">
      <div className="flex items-center gap-2 border-b p-2">
        <Button
          type="button"
          className="size-8"
          onClick={toggleBold}
          variant={'ghost'}
          size={'icon'}
        >
          <BoldIcon />
        </Button>
        <Button
          type="button"
          className="size-8"
          onClick={toggleHeading}
          variant={'ghost'}
          size={'icon'}
        >
          <Heading2 />
        </Button>
        <Button
          type="button"
          className="size-8"
          onClick={setLink}
          variant={'ghost'}
          size={'icon'}
        >
          <LinkIcon />
        </Button>
      </div>
      <EditorContent editor={editor} className="text-editor" />
    </div>
  )
}
