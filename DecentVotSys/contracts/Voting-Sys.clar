(define-map polls
  (tuple (poll-id uint))
  (tuple
    (creator principal)
    (options (list 20 (tuple (option-name (string-ascii 20)) (votes uint))))
    (total-votes uint)))

(define-public (create-poll (poll-id uint) (options (list 20 (string-ascii 20))))
  (if (map-get? polls (tuple (poll-id poll-id)))
    (err u1)
    (ok (map-set polls 
        (tuple (poll-id poll-id))
        (tuple
          (creator tx-sender)
          (options (map (lambda (option) (tuple (option-name option) (votes u0))) options))
          (total-votes u0))))
  )
)

(define-public (vote (poll-id uint) (option-name (string-ascii 20)))
  (let ((poll (unwrap! (map-get? polls (tuple (poll-id poll-id))) (err u1))))
    (let ((options (get options poll)))
      (let ((option (unwrap! (find-option option-name options) (err u2))))
        (let ((new-votes (+ (get votes option) u1)))
          (let ((updated-options (update-option option-name new-votes options)))
            (map-set polls (tuple (poll-id poll-id))
              (merge poll 
                (tuple
                  (options updated-options)
                  (total-votes (+ u1 (get total-votes poll))))))
            (ok true)))))
  )
)

(define-read-only (get-results (poll-id uint))
  (let ((poll (unwrap! (map-get? polls (tuple (poll-id poll-id))) (err u1))))
    (ok (get options poll)))
)

(define-private (find-option (option-name (string-ascii 20)) (options (list 20 (tuple (option-name (string-ascii 20)) (votes uint)))))
  (fold option-found options
    (lambda (option acc)
      (if (is-eq (get option-name option) option-name)
        (ok option)
        acc))
    (err u404))
)

(define-private (update-option (option-name (string-ascii 20)) (new-votes uint) (options (list 20 (tuple (option-name (string-ascii 20)) (votes uint)))))
  (map options
    (lambda (option)
      (if (is-eq (get option-name option) option-name)
        (merge option (tuple (votes new-votes)))
        option)))
)